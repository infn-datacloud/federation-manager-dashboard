import { signIn, auth } from '../../../auth';

export async function SignInButtons() {
	const session = await auth();

	if (!session?.user) {
		return (
			<form
				action={async () => {
					'use server';
					await signIn('indigo-iam', { redirectTo: "/" });
				}}
			>
				<button type='submit'>Signin with indigo IAM</button>
			</form>
		);
	}
}
