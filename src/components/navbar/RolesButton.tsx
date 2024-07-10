'use client';
import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useContext } from 'react';
import { RoleManagement } from '@/app/layout';

export default function RolesButton() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const context = useContext(RoleManagement);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = () => {
		handleClose();

		if (context.currentRole == 'tester') {
			context.setCurrentRole('admin');
		} else if (context.currentRole == 'admin') {
			context.setCurrentRole('tester');
		}
	};

	let rolesList = [];

	for (let count in context.rolesList) {
		let temp_role = context.rolesList[count];

		if (temp_role != context.currentRole) {
			rolesList.push(
				<MenuItem
					onClick={handleChange}
					key={temp_role.replaceAll(' ', '_')}
					sx={{ textTransform: 'uppercase'}}
				>
					{temp_role}
				</MenuItem>
			);
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
				{context.currentRole}
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
				{rolesList}
			</Menu>
		</>
	);
}
