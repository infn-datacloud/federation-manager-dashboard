import { Container } from '@mui/material';
import PageHeader from '@/components/utilities/PageHeader';

export default function Login() {
    return (
        <>
			<br />
			<br />
			<br />
			<Container>
				<PageHeader />
			</Container>
			{process.env.CLIENT_ID}
		</>
    );
}
