import React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

export default function CollapsingBox(
	params: Readonly<{
		title: React.ReactNode;
		body: React.ReactNode;
	}>
) {
	return (
		<>
			<Accordion
				sx={{
					borderRadius: '25px!important',
					boxShadow: '-3px 3px 8px -3px #00000020',
					color: 'inherit',
					'&:before': {
						backgroundColor: 'transparent',
					},
				}}
			>
				<AccordionSummary
					title='Toggle section'
					expandIcon={<ArrowDropDownRoundedIcon fontSize='large' />}
					aria-controls='panel1-content'
					id='panel1-header'
					sx={{ padding: '1em 3em' }}
				>
					<Typography
						variant='h5'
						fontWeight='bold'
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						{params.title}
					</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ padding: '0em 3em 2em' }}>
					{params.body}
				</AccordionDetails>
			</Accordion>
			<br />
		</>
	);
}
