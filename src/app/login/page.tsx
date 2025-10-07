'use client';

import { Button } from '@/components/buttons';
import Header from '@/components/header';
import { authClient } from '@/lib/auth-client';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';

export default function LoginPage() {
	const handleLogin = async () => {
		const { data, error } = await authClient.signIn.oauth2({
			providerId: 'iam',
			callbackURL: '/',
			errorCallbackURL: '/',
			newUserCallbackURL: '/',
			disableRedirect: false,
			scopes: process.env.IAM_SCOPES?.split(' '),
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
					className='btn btn-primary btn-bold w-min'
					onClick={handleLogin}
				>
					Log in <ArrowLeftEndOnRectangleIcon className='size-5' />
				</Button>
			</div>
		</>
	);
}
