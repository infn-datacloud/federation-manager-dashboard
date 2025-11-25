'use client';

import { Button } from '@/components/buttons';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push('/login');
					router.refresh();
				},
			},
		});
	};

	return (
		<div title='Logout'>
			<Button className='btn btn-tertiary' onClick={handleLogout}>
				<ArrowLeftStartOnRectangleIcon className='size-8' />
			</Button>
		</div>
	);
}
