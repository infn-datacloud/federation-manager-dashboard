import { Container } from '@mui/material';
import PageHeader from '@/components/utilities/PageHeader';

import { SignInButtons } from '@/components/auth/SignInButtons';

export default function Login() {
	return (
		<>
			<br />
			<br />
			<br />
			<Container>
				<PageHeader />
				<SignInButtons />
			</Container>
		</>
	);
}
