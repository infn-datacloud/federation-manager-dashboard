'use client';

import React from 'react';
import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* Components */
import Navbar from '@/components/navbar/Navbar';

/* IAM Authentication */
import Authentication from '@/middleware/auth';

/* Roles management */
import RolesContext from '@/middleware/roles';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
				<html lang='en'>
					<head>
						<meta
							name='viewport'
							content='initial-scale=1, width=device-width'
							/>
					</head>
						<body>
							<Authentication>
								<RolesContext>
									{/* Navbar */}
									<header>
										<Navbar />
									</header>

									{/* Body */}
									{children}

									{/* Footer */}
									{/* <footer>Footer</footer> */}
								</RolesContext>
							</Authentication>
						</body>
				</html>
	);
}
