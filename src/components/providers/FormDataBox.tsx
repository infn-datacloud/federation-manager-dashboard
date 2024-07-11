import { useContext } from 'react';
import { Typography, Box, Button } from '@mui/material';

import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { RoleManagement } from '@/middleware/roles';

import CollapsingBox from '@/components/utilities/CollapsingBox';

export default function FormDataBox() {
	const context = useContext(RoleManagement);
	let button = <></>;

	if (context.currentRole == 'admin') {
		button = (
			<Box display='flex' justifyContent='flex-end' marginTop='1rem'>
				<Button
					title='Edit data'
					variant='outlined'
					sx={{
						borderRadius: '25px',
						fontWeight: 'bold',
						display: 'flex',
						alignItems: 'center',
						padding: '5px 32px',
						color: '#002A48',
						borderColor: '#002A48',
						'&:hover': {
							borderColor: '#002A48',
						},
					}}
					endIcon={<EditRoundedIcon />}
				>
					Edit
				</Button>
			</Box>
		);
	}

	let title = (
		<>
			<SubjectRoundedIcon />
			&nbsp;Data
		</>
	);

	let data = (
		<>
			<Typography>
				<b>Lorem ipsum:</b> dolor sit amet, consectetur adipiscing elit.
				Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
				eget. <br />
				<b>Lorem ipsum:</b> dolor sit amet, consectetur adipiscing elit.
				Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
				eget. <br />
				<b>Lorem ipsum:</b> dolor sit amet, consectetur adipiscing elit.
				Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
				eget. <br />
			</Typography>

			{button}
		</>
	);

	return <CollapsingBox title={title} body={data} />;
}
