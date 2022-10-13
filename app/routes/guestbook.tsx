import { json } from '@remix-run/cloudflare';
import { useActionData, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import format from 'date-fns/format';
import { type LoaderArgs, type ActionArgs } from '~/types';

export function meta() {
	return {
		title: 'Dan Gurney - Guestbook',
	};
}

type GuestbookEntriesKvKey = 'guestbook-entries';
const kvKey: GuestbookEntriesKvKey = 'guestbook-entries';

interface GuestbookEntry {
	name: string;
	email: string;
	message: string;
	createdAt: string;
	ip: string | null;
}
type GuestbookEntries = Array<GuestbookEntry>;

export async function loader({ context, request }: LoaderArgs) {
	const kv = context.KV;
	const entriesJson = (await kv.get(kvKey)) ?? '[]';
	const entries: GuestbookEntries = JSON.parse(entriesJson);
	const requestIp = request.headers.get('cf-connecting-ip');
	const existingEntry = entries.find((e) => e.ip === requestIp);
	return json({ entries, existingEntry });
}

interface ActionData {
	error?: string;
	success?: boolean;
}

export async function action({ request, context }: ActionArgs) {
	const kv = context.KV;
	const entriesJson = (await kv.get(kvKey)) ?? '[]';
	const entries: GuestbookEntries = JSON.parse(entriesJson);
	const requestIp = request.headers.get('cf-connecting-ip');
	const formData = await request.formData();
	const form = Object.fromEntries(formData);

	if (form.action === 'post') {
		const existingEntry = entries.find((e) => e.ip === requestIp);
		if (existingEntry) {
			return json<ActionData>(
				{ error: 'You already left a guestbook entry' },
				{ status: 400 }
			);
		}
		const formSchema = z.object({
			name: z.string().min(1).max(100),
			email: z.string().max(100),
			message: z.string().min(1).max(1000),
		});
		const parsed = formSchema.safeParse(form);
		if (!parsed.success) {
			return json<ActionData>(
				{ error: 'There is an issue with one of your entries' },
				{ status: 400 }
			);
		}
		const { name, email, message } = parsed.data;
		const entry: GuestbookEntry = {
			name,
			email,
			message,
			createdAt: new Date().toISOString(),
			ip: requestIp,
		};
		const updatedEntries = [entry, ...entries];
		await kv.put(kvKey, JSON.stringify(updatedEntries));
		return json<ActionData>({ success: true });
	}

	if (form.action === 'delete') {
		const updatedEntries = entries.filter((e) => e.ip !== requestIp);
		await kv.put(kvKey, JSON.stringify(updatedEntries));
		return json<ActionData>({ success: true });
	}
}

export default function Guestbook() {
	const { entries, existingEntry } = useLoaderData<typeof loader>();
	const data = useActionData<ActionData>();

	return (
		<div>
			<h1 className="mb-6">Guestbook</h1>
			<div className="mb-6">
				Leave me a note below - where are you visiting from?
			</div>

			<div className="mb-12">
				{!existingEntry ? (
					<form
						method="post"
						className="flex flex-col items-start space-y-2 rounded border border-gray-500 p-4"
					>
						<input
							type="text"
							name="name"
							placeholder="Your name"
							required
							className="w-full"
						/>
						<input
							type="text"
							name="email"
							placeholder="Your email (if you want to)"
							className="w-full"
						/>
						<input
							type="text"
							name="message"
							placeholder="Your message..."
							required
							className="w-full"
						/>
						<button type="submit" name="action" value="post">
							Send
						</button>
						{data?.error && (
							<div className="pt-4 text-red-500">{data.error}</div>
						)}
					</form>
				) : (
					<form
						method="post"
						className="flex flex-col items-start space-y-3 rounded border border-gray-500 p-4"
					>
						<div>
							<span className="text-gray-400">
								Your message from{' '}
								{format(
									new Date(existingEntry.createdAt),
									"MMM d, yyyy 'at' h:mm aaa"
								)}
								:
							</span>
							<div>{existingEntry.message}</div>
						</div>
						<button
							type="submit"
							name="action"
							value="delete"
							className="destructive"
						>
							Delete
						</button>
					</form>
				)}
			</div>

			{entries.length === 0 ? (
				<div className="text-gray-400">No entries yet</div>
			) : (
				<ul className="space-y-4">
					{entries.map((e, idx) => (
						<li className="flex flex-col" key={idx}>
							<span>{e.message}</span>
							<span className="text-sm text-gray-500">
								{e.name}
								{' - '}
								{format(new Date(e.createdAt), "MMM d, yyyy 'at' h:mm aaa")}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
