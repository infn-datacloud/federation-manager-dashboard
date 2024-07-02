import React from "react";

import type { Metadata } from "next";
import "./globals.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* Components */
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
	title: "Federation Manager",
	description: "Federation Manager Dashboard",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
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
	);
}
