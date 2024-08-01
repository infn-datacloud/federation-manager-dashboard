'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Logout() {
	const { status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			signOut();
		}
	});
}
