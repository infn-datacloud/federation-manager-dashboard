import Box from '@/components/box';
import { Gravatar } from '@/components/gravatar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import LogoutButton from './LogoutButton';
import Custom401 from '@/app/pages/401';

export default async function Settings() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />;
	}

	return (
		<>
			<Box>
				<div className='flex items-center justify-between w-full'>
					<div className='flex items-center gap-6'>
						<Gravatar email={session?.user.email} />
						<h1>{session?.user.name}</h1>
					</div>

					<LogoutButton />
				</div>
			</Box>
		</>
	);
}
