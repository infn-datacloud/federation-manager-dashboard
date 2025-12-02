import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Link from '@/components/link';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ToasterPortal } from '@/components/toaster';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Federation Manager',
	description: 'Welconme to the Federation Manager Dashboard',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Navbar
					logo='/logos/infn_logo_white.png'
					name='Federation Manager'
				>
					<div className='flex items-center h-full text-white'>
						{session && (
							<Link
								href='/settings'
								className='text-white h-full ml-auto mr-4 flex items-center'
							>
								<Cog8ToothIcon className='size-7' />
							</Link>
						)}
					</div>
				</Navbar>

				<div className='w-full md:w-3/4 lg:w-1/2 mx-auto p-8'>
					{children}

					<ToasterPortal />
				</div>
			</body>
		</html>
	);
}
