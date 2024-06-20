import type { Metadata } from "next";
import "./globals.css";

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
				<footer>Footer</footer>
			</body>
		</html>
	);
}
