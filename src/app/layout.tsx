
'use client'

import React from 'react';

/* import type { Metadata } from 'next'; */
import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* Components */
import Navbar from '@/components/navbar/Navbar';

/* export const metadata: Metadata = {
	title: 'Federation Manager',
	description: 'Federation Manager Dashboard',
}; */

import { AuthProvider } from 'react-oidc-context';

const base_url = 'https://iam.cloud.infn.it';

const oidcConfig = {
	client_id: '014b05f1-9a48-41a6-8b54-5ddddc595c8a',
	client_secret:
		'APMCf9s3tsP16AJ2gmiJm1WmiwN-HR5ntVTasGf5KBcXcxlOVItqIPHg4Rgh3pLAgoBubcvwAADJyOd5Lfg5qfU',
	base_url: base_url,
	token_url: base_url + '/token',
	auto_refresh_url: base_url + '/token',
	authorization_url: base_url + '/authorize',
	redirect_to: '/',
	authority: base_url,
	redirect_uri: 'https://localhost:3000/',
	automaticSilentRenew: true,
	onSigninCallback: () => {
		window.history.replaceState(null, '', '/');
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider {...oidcConfig}>
			<html lang='en'>
				<head>
					<meta
						name='viewport'
						content='initial-scale=1, width=device-width'
					/>
				</head>
				<body>
					{/* Navbar */}
					<header>
						<Navbar />
					</header>

					{/* Body */}
					{children}

					{/* Footer */}
					{/* <footer>Footer</footer> */}
				</body>
			</html>
		</AuthProvider>
	);
}
