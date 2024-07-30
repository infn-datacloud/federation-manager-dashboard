import React, { useEffect, useContext, useState } from 'react';
import { getRoles } from '@/middleware/connection';
import Cookies from 'js-cookie';

const roles: any[] | (() => any[]) = [];
const role = '';

interface RoleManagementStructure {
	rolesList: Array<string>;
	currentRole: string;
	setCurrentRole: (role: string) => void;
	setRolesList: (roles: Array<string>) => void;
}

export const RoleManagement = React.createContext<RoleManagementStructure>({
	rolesList: [],
	currentRole: '',
	setCurrentRole: () => {},
	setRolesList: () => {},
});

export default function RolesContext({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [rolesList, setRolesList] = React.useState(roles);
	const [currentRole, setCurrentRole] = React.useState<string>(role);
	const value = { currentRole, setCurrentRole, rolesList, setRolesList };

	return (
		<RoleManagement.Provider value={value}>
			{children}
		</RoleManagement.Provider>
	);
}

export const useRoles = () => {
	const context = useContext(RoleManagement);

	const fetchRoles = async () => {
		try {
			let roles = await getRoles();
			context.setRolesList(roles);

			if (roles.length > 0) {
				if (
					Cookies.get('currentRole')?.toString() == 'undefined' ||
					Cookies.get('currentRole') == undefined
				) {
					context.setCurrentRole(roles[0]);
					Cookies.set('currentRole', roles[0]);
				} else {
					let currentRole = Cookies.get('currentRole') ?? '';
					context.setCurrentRole(currentRole);
				}
			}
		} catch (err) {
			
		}
	};

	useEffect(() => {
		fetchRoles();
	}, []);
};
