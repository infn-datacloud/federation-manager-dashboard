import { createContext, ReactNode, useState } from 'react';

interface SocketManagementStructure {
	socket: any;
	setSocket: (socket: any) => void;
}

export const SocketManagement = createContext<SocketManagementStructure>({
	socket: null,
	setSocket: () => {}
});

export default function SocketContext({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [socket, setSocket] = useState(null);
	const value = { socket, setSocket };

	return (
		<SocketManagement.Provider value={value}>
			{children}
		</SocketManagement.Provider>
	);
}