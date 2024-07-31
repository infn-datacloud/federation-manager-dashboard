'use client';

import { signOut } from 'next-auth/react';
import { Button, IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export function SignOutButton(
	props: Readonly<{
		text?: boolean;
	}>
) {
	if (props.text) {
		return (
			<Button
				endIcon={<LogoutRoundedIcon />}
				variant='contained'
				title='Log out'
				onClick={() => signOut()}
			>
				Log Out
			</Button>
		);
	} else {
		return (
			<IconButton title='Log out' onClick={() => signOut()}>
				<LogoutRoundedIcon />
			</IconButton>
		);
	}
}
