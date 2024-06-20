'use client'

import * as React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function NotificationsButton() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				size="large"
				aria-label="Show 2 new notifications"
				color="inherit"
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<Badge badgeContent={2} color="error">
					<NotificationsIcon />
				</Badge>
			</IconButton>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				sx={{ maxHeight: '40%' }}
			>

				<MenuItem onClick={handleClose} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', textWrap: 'wrap' }}>
					<React.Fragment>
						<Typography
							component="span"
							color="text.primary"
							variant="body2"
						>
							<FiberManualRecordIcon sx={{ fontSize: 10 }} color="error" />&nbsp;
							<b>Lorem ipsum</b> dolor sit amet.
						</Typography>
					</React.Fragment>
				</MenuItem>

				<Divider />

				<MenuItem onClick={handleClose} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', textWrap: 'wrap' }}>
					<React.Fragment>
						<Typography
							component="span"
							color="text.primary"
							variant="body2"
						>
							<FiberManualRecordIcon sx={{ fontSize: 10 }} color="error" />&nbsp;
							<b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit.
						</Typography>
					</React.Fragment>
				</MenuItem>

				<Divider />

				<MenuItem onClick={handleClose} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', textWrap: 'wrap' }}>
					<React.Fragment>
						<Typography
							component="span"
							color="text.disabled"
							variant="body2"
						>
							<b>Lorem ipsum</b> dolor sit amet.
						</Typography>
					</React.Fragment>
				</MenuItem>

			</Menu>
		</>
	);
}
