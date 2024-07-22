import React, { useEffect, useContext, useState } from 'react';
import { getRoles } from '@/middleware/connection';
import { useAuth } from 'react-oidc-context';
import Cookies from 'js-cookie';

const roles: any[] | (() => any[]) = [];
const role = '';

export const RoleContext = React.createContext({
	rolesList: roles,
	currentRole: role,
});

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
	const auth = useAuth();
	const context = useContext(RoleManagement);

	const [loading, setLoading] = useState<any>(true);
	const [error, setError] = useState<any>(null);

	const fetchRoles = async () => {
		try {
			let roles = await getRoles(auth);
			context.setRolesList(roles);

			if (Cookies.get('currentRole')?.toString() == 'undefined' || Cookies.get('currentRole') == undefined) {
				context.setCurrentRole(roles[0]);
				Cookies.set('currentRole', roles[0]);
			} else {
				let currentRole = Cookies.get('currentRole') ?? '';
				context.setCurrentRole(currentRole);
			}
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (auth.isAuthenticated) {
			fetchRoles();
		}
	}, [auth.isAuthenticated]);
};
