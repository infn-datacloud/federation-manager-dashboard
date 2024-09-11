import { Box, Typography } from '@mui/material';
import CreateForm from '../Form';

export default function InputObject(
	props: Readonly<{
		elem: any;
		name: string;
		description: string;
	}>
) {
	if (Object.keys(props.elem).length <= 0) {
		return;
	}

	return (
		<Box
			sx={{
				background: '#00000007',
				padding: '1em',
				borderRadius: '25px',
				marginBottom: '1em',
			}}
		>
			<Typography
				variant='subtitle2'
				sx={{
					marginBottom: '1em',
				}}
			>
				{props.description}
			</Typography>
			<Box>
				<CreateForm structure={props.elem} name={props.name} />
			</Box>
		</Box>
	);
}
