import { Box, Button, Typography } from '@mui/material';
import { signIn, auth } from '../../../auth';

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
	}
}
