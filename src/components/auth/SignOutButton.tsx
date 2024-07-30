import { signOut } from '@/auth';
import { Button, IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export async function SignOutButton(
	props: Readonly<{
		text?: boolean;
	}>
) {
	if (props.text) {
		return (
			<form
				action={async () => {
					'use server';
					await signOut({ redirectTo: '/login' });
				}}
			>
				<Button
					endIcon={<LogoutRoundedIcon />}
					variant='contained'
					type='submit'
				>
					Log Out
				</Button>
			</form>
		);
	} else {
		return (
			<form
				action={async () => {
					'use server';
					await signOut({ redirectTo: '/login' });
				}}
			>
				<IconButton title='Log out' type='submit'>
					<LogoutRoundedIcon />
				</IconButton>
			</form>
		);
	}
}
