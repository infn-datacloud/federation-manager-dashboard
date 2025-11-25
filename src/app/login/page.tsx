'use client';

import { Button } from '@/components/buttons';
import Header from '@/components/header';
import { authClient } from '@/lib/auth-client';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';

export default function LoginPage() {
	const handleLogin = async () => {
		await authClient.signIn.oauth2({
			providerId: 'iam',
			callbackURL: '/',
			errorCallbackURL: '/',
			newUserCallbackURL: '/',
			disableRedirect: false,
			scopes: process.env.FM_OIDC_SCOPES?.split(' '),
			requestSignUp: false,
		});
	};

	return (
		<>
			<Header
				logo='/logos/infn_logo.png'
				title='Federation Manager'
				subtitle='Seamlessly integrating providers and communities into DataCloud with simplicity, security, and automated resource management.'
			/>
			<div className='flex flex-col items-center w-full'>
				<Button
					className='btn btn-primary w-full md:w-1/2 px-4 py-2 font-bold text-lg flex justify-center items-center space-x-2'
					onClick={handleLogin}
				>
					<ArrowLeftEndOnRectangleIcon className='size-6' />
					Log in with IAM
				</Button>
			</div>
		</>
	);
}
