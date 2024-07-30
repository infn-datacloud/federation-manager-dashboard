import { Box, Button, Typography } from '@mui/material';
import { signIn, auth } from '../../../auth';
import { SignOutButton } from './SignOutButton';

export async function SignInButtons() {
	const session = await auth();

	if (!session?.user) {
		return (
			<Box display='flex' flexDirection='column' alignItems='center'>
				<Typography variant='h5' margin='2em 0 1em 0'>
					Signin with
				</Typography>

				<form
					action={async () => {
						'use server';
						await signIn('indigo-iam', { redirectTo: '/' });
					}}
				>
					<Button
						size='large'
						variant='contained'
						type='submit'
						sx={{ width: '15rem', marginBottom: '1em' }}
					>
						indigo IAM
					</Button>
				</form>
			</Box>
		);
	} else {
		return (
			<Box display='flex' flexDirection='column' alignItems='center'>
				<Typography variant='h5' sx={{marginTop: '2em', marginBottom: '1em'}}>
					You are already signed in as <b>{session.user.name}</b>.
				</Typography>
				<SignOutButton text={true} />
			</Box>
		);
	}
}
