import React from 'react';

const roles = ['admin', 'tester'];
const role = 'admin';

export const RoleContext = React.createContext({
	rolesList: roles,
	currentRole: role,
});

interface RoleManagementStructure {
	rolesList: Array<string>;
	currentRole: string;
	setCurrentRole: (newMessage: string) => void;
}

export const RoleManagement = React.createContext<RoleManagementStructure>({
	rolesList: [],
	currentRole: '',
	setCurrentRole: () => {},
});

export default function RolesContext({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	let rolesList = roles;
	const [currentRole, setCurrentRole] = React.useState<string>(role);
	const value = { currentRole, setCurrentRole, rolesList };

	return (
		<RoleManagement.Provider value={value}>
			{children}
		</RoleManagement.Provider>
	);
}
