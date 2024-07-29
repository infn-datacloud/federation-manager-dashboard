import { signOut } from '../../../auth';
import { IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export async function SignOutButton() {
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
