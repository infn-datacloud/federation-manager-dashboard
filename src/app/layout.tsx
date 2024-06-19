import type { Metadata } from "next";
import "./globals.css";

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
			<body>
				<header>Navbar</header>
				{children}
				<footer>Footer</footer>
			</body>
		</html>
	);
}
