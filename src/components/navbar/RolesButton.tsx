'use client';
import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function RolesButton() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [currentRole, setCurrentRole] = React.useState('Tester');
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = () => {
		handleClose();

		if (currentRole == 'Tester') {
			setCurrentRole('Site Admin');
		} else if (currentRole == 'Site Admin') {
			setCurrentRole('Tester');
		}
	};

	const roles = ['Site Admin', 'Tester'];
	let rolesList = [];

	for ( let count in roles ) {
		let role = roles[count];

		if (role != currentRole ) {
			rolesList.push(<MenuItem onClick={handleChange} key={role.replaceAll(' ', '_')}>{role}</MenuItem>)
		}
	}

	return (
		<>
			<Button
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}
				endIcon={<ArrowDropDownIcon />}
			>
				{ currentRole }
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{ rolesList }
			</Menu>
		</>
	);
}
