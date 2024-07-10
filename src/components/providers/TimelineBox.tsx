import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography, Box, TextField, Button } from '@mui/material';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TimelineOppositeContent, {
	timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

import CollapsingBox from '@/components/utilities/CollapsingBox';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
	palette: {
		primary: {
			main: '#162D4D',
		},
	},
});

export default function TimelineBox() {
	let title = (
		<>
			<HistoryRoundedIcon />
			&nbsp;History Log
		</>
	);

	let body = (
		<>
			{/* COMMENT SECTION */}
			<Box
				display='flex'
				alignItems='flex-end'
				justifyContent='space-between'
			>
				<ThemeProvider theme={theme}>
					<TextField
						label='Add a comment'
						variant='standard'
						color='primary'
						autoComplete='off'
						multiline
						fullWidth
					/>
				</ThemeProvider>
				&nbsp;
				<Button
					title='Add a comment'
					variant='contained'
					sx={{
						borderRadius: '25px',
						fontWeight: 'bold',
						backgroundColor: '#002A48',
						width: '10%',
						'&:hover': {
							backgroundColor: '#012d4d',
						},
					}}
				>
					Add +
				</Button>
			</Box>

			{/* TIMELINE */}
			<Timeline
				sx={{
					[`& .${timelineOppositeContentClasses.root}`]: {
						flex: 0.2,
					},
				}}
			>
				<TimelineItem>
					<TimelineOppositeContent
						sx={{ m: 'auto 0' }}
						align='right'
						variant='body2'
						color='text.disabled'
						fontWeight='bold'
					>
						01/07/2024 - 14:56
					</TimelineOppositeContent>

					<TimelineSeparator>
						<TimelineConnector />

						<TimelineDot>
							<ChatRoundedIcon />
						</TimelineDot>

						<TimelineConnector />
					</TimelineSeparator>

					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography variant='h6' component='span'>
							Hello this is working fine! Lorem ipsum dolor sit
							amet consectetur adipisicing elit. Inventore
							aliquid, iste repellat.
						</Typography>
						<Typography fontSize='small'>
							<b>Ettore Serra</b> added a comment
						</Typography>
					</TimelineContent>
				</TimelineItem>

				<TimelineItem>
					<TimelineOppositeContent
						sx={{ m: 'auto 0' }}
						align='right'
						variant='body2'
						color='text.disabled'
						fontWeight='bold'
					>
						01/07/2024 - 12:15
					</TimelineOppositeContent>

					<TimelineSeparator>
						<TimelineConnector />

						<TimelineDot>
							<SettingsRoundedIcon />
						</TimelineDot>

						<TimelineConnector />
					</TimelineSeparator>

					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography variant='h6' component='span'>
							Status changed from “IN PROGRESS” to “ERROR”
						</Typography>
						<Typography fontSize='small'>
							<b>Sysyem</b> changed status
						</Typography>
					</TimelineContent>
				</TimelineItem>

				<TimelineItem>
					<TimelineOppositeContent
						sx={{ m: 'auto 0' }}
						align='right'
						variant='body2'
						color='text.disabled'
						fontWeight='bold'
					>
						01/07/2024 - 10:22
					</TimelineOppositeContent>

					<TimelineSeparator>
						<TimelineConnector />

						<TimelineDot>
							<SecurityRoundedIcon />
						</TimelineDot>

						<TimelineConnector />
					</TimelineSeparator>

					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography variant='h6' component='span'>
							Created “Provider Example”
						</Typography>
						<Typography fontSize='small'>
							<b>Admin</b> created the provider
						</Typography>
					</TimelineContent>
				</TimelineItem>
			</Timeline>
		</>
	);

	return <CollapsingBox title={title} body={body} />;
}
