'use client';
import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useContext } from 'react';
import { RoleManagement } from '@/middleware/roles';
import Cookies from 'js-cookie';

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

	const handleChange = (event: React.MouseEvent<any>) => {
		handleClose();
		
		const value = event.currentTarget.getAttribute('value');

		context.setCurrentRole(value);
		Cookies.set('currentRole', value);
	};

	let rolesList = [];

	for (let count in context.rolesList) {
		let temp_role = context.rolesList[count];

		if (temp_role != context.currentRole) {
			rolesList.push(
				<MenuItem
					title={'Change role to ' + temp_role}
					onClick={handleChange}
					key={temp_role.replaceAll(' ', '_')}
					value={temp_role}
					sx={{
						textTransform: 'uppercase',
						fontSize: '14px',
						fontWeight: 'bold',
						color: '#162d4d',
					}}
				>
					{temp_role}
				</MenuItem>
			);
		}
	}

	if (rolesList.length > 0) {
		return (
			<>
				<Button
					id='basic-button'
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
					sx={{
						color: 'white',
						fontWeight: 'bold',
						marginRight: '10px',
					}}
					endIcon={<ArrowDropDownIcon />}
					title='Change role'
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
}
