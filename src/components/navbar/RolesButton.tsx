'use client';
import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Cookies from 'js-cookie';
import { Typography } from '@mui/material';

export default function RolesButton(
	props: Readonly<{
		rolesList: Array<string>;
		currentRole: string;
		handleRoleChange: (role: string) => void;
	}>
) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (event: React.MouseEvent<any>) => {
		handleClose();

		const value = event.currentTarget.getAttribute('value');

		props.handleRoleChange(value);
		Cookies.set('currentRole', value);
	};

	let itemsList = [];

	for (let role of props.rolesList) {
		if (role != props.currentRole) {
			itemsList.push(
				<MenuItem
					title={'Change role to ' + role}
					onClick={handleChange}
					key={role.replaceAll(' ', '_')}
					value={role}
					sx={{
						textTransform: 'uppercase',
						fontSize: '14px',
						fontWeight: 'bold',
						color: '#162d4d',
					}}
				>
					{role}
				</MenuItem>
			);
		}
	}

	if (itemsList.length > 0) {
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
					{props.currentRole}
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
					{itemsList}
				</Menu>
			</>
		);
	} else {
		return (
			<Typography
				sx={{
					color: 'white',
					fontWeight: 'bold',
					fontSize: '0.875rem',
					marginRight: '10px',
					textTransform: 'uppercase',
				}}
			>
				{props.currentRole}
			</Typography>
		);
	}
}
