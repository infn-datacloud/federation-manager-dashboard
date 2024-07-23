import { useRoles } from './roles';
import { RoleManagement } from '@/middleware/roles';
import { useContext, useEffect } from 'react';
import { connectToSiteAdmin } from '@/middleware/socketio_connections/site_admin';
import { SocketManagement } from '@/middleware/contextes/socket';
import { connectToSiteTester } from '@/middleware/socketio_connections/site_tester';
import { useAuth } from 'react-oidc-context';
import Navbar from '@/components/navbar/Navbar';
import Loading from '@/app/loading';
import { useRouter } from 'next/navigation';

export default function PageContent({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = useAuth();
	let content;

	/* Go to login page if not authenticated */
	const router = useRouter();
	useEffect(() => {
		if (!auth.isAuthenticated && !auth.isLoading) {
			router.push('/login');
		}
	});

	/* Set user roles */
	useRoles();
	const roleCtx = useContext(RoleManagement);

	/*  Set socket context */
	const socketCtx = useContext(SocketManagement);
	useEffect(() => {
		if (socketCtx.socket !== null) {
			socketCtx.socket.disconnect();
			socketCtx.setSocket(null);
		}
		if (auth.isAuthenticated) {
			switch (roleCtx.currentRole) {
				case 'site admin':
					socketCtx.setSocket(connectToSiteAdmin(auth));
					break;

				case 'site tester':
					socketCtx.setSocket(connectToSiteTester(auth));
					break;
			}
		}
	}, [auth.isAuthenticated, roleCtx.currentRole]);

	/* Don't show content if page is loading */
	if (auth.isLoading) {
		content = <Loading />;
	} else {
		content = children;
	}

	/* Manage auth errors */
	if (auth.error) {
		return <div>Oops... {auth.error.message}</div>;
	}

	return (
		<>
			{/* Navbar */}
			<header>
				<Navbar
					isAuthenticated={auth.isAuthenticated}
					isLoading={auth.isLoading}
					login={auth.signinRedirect}
					rolesList={roleCtx.rolesList}
					currentRole={roleCtx.currentRole}
					setCurrentRole={roleCtx.setCurrentRole}
				/>
			</header>

			{/* Body */}
			{content}

			{/* Footer */}
			{/* <footer>Footer</footer> */}
		</>
	);
}
