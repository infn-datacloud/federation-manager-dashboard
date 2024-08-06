import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CreateForm from '../Form';

import { useEffect, useState } from 'react';

interface InputArrayObject {
	description: string;
	items: any;
	required: boolean;
	minItems: number;
}

function SingleItem(
	props: Readonly<{
		type: any;
		format: any;
		value: any;
		onChange: any;
		items: any;
		identifier: any;
		onRemove: any;
		canRemove: boolean;
	}>
) {
	if (props.items.type == 'string') {
		return (
			<Box display='flex' alignItems='center'>
				<TextField
					label='test1'
					type='text'
					variant='outlined'
					color='primary'
					value={props.value}
					onChange={(e) => {
						props.onChange(e, e.target.value);
					}}
					fullWidth
				/>
				<Box
					sx={{
						background: 'white',
						border: '1px solid #d32f2f',
						borderRadius: '50%',
						display: !props.canRemove ? 'none' : undefined,
					}}
				>
					<IconButton
						onClick={() => props.onRemove()}
						color='error'
						title='Remove item'
						size='small'
						disabled={!props.canRemove}
					>
						<CloseRoundedIcon fontSize='inherit' />
					</IconButton>
				</Box>
			</Box>
		);
	} else {
		return (
			<Box
				sx={{
					border: '1px solid #162d4d99',
					borderRadius: '25px',
					padding: '1em',
					margin: '24px 8px 0',
					position: 'relative',
				}}
			>
				<Typography
					variant='subtitle2'
					sx={{
						margin: '0 8px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						height: '28px',
						width: '95%',
						position: 'absolute',
						top: '-14px',
					}}
				>
					<b style={{ background: 'white', padding: '0 8px' }}>
						{props.items.description}
					</b>
					<Box
						sx={{
							background: 'white',
							border: '1px solid #d32f2f',
							borderRadius: '50%',
							display: !props.canRemove ? 'none' : undefined,
						}}
					>
						<IconButton
							onClick={() => props.onRemove()}
							color='error'
							title='Remove item'
							size='small'
							disabled={!props.canRemove}
						>
							<CloseRoundedIcon fontSize='inherit' />
						</IconButton>
					</Box>
				</Typography>
				<CreateForm
					structure={props.items.properties}
					onChange={props.onChange}
					value={props.value}
				/>
			</Box>
		);
	}
}

export default function InputArray(
	props: Readonly<{
		elem: InputArrayObject;
	}>
) {
	const defaultObj = {
		type: props.elem.items.type,
		format: props.elem.items.format,
		items: props.elem.items,
		value: '',
		identifier: '',
	};

	let itemsList = [];
	for (let i = 0; i < props.elem.minItems; i++) {
		itemsList.push(defaultObj);
	}

	const [items, setItems] = useState(itemsList);
	const [canRemove, setCanRemove] = useState(false);

	const handleChange = (e: any, idx: number, value: any) => {
		let newItems = [...items];
		if (newItems[idx].items.type == 'string') {
			newItems[idx].value = value;
		} else {
			let name = e.target.name.split('_');
			name.pop();
			name = name.join('_');

			let elem = newItems[idx].items.properties[name];
			if (elem) {
				elem.value = value;
			}
		}

		setItems(newItems);
	};

	const handleRemove = (idx: number) => {
		if (canRemove) {
			let newItems = [...items];
			newItems.splice(idx, 1);
			setItems(newItems);
		}
	};

	useEffect(() => {
		setCanRemove(items.length > props.elem.minItems);
	}, [items]);

	let components = [];

	for (let i in items) {
		items[i].identifier = i;

		for (let key in items[i].items.properties) {
			items[i].items.properties[key].identifier = i;
		}

		components.push(
			<SingleItem
				key={i}
				onChange={(e: any, value: any) =>
					handleChange(e, Number(i), value)
				}
				onRemove={() => handleRemove(Number(i))}
				canRemove={canRemove}
				{...items[i]}
			/>
		);
	}

	//console.log(items);

	return (
		<Box
			sx={{
				border: '2px solid #162d4d99',
				borderRadius: '25px',
				padding: '1em',
				margin: '2em 0 1.5em 0',
				position: 'relative',
			}}
		>
			<Typography
				variant='subtitle2'
				sx={{
					margin: '0 8px',
					position: 'absolute',
					top: '-12px',
				}}
			>
				<b style={{ background: 'white', padding: '0 8px' }}>
					{props.elem?.description}
				</b>
			</Typography>
			<Box>
				<Box>{components}</Box>
				<Button
					variant='outlined'
					startIcon={<AddRoundedIcon />}
					sx={{ margin: '1em 8px 0' }}
					onClick={() => {
						console.log(items)
						let newItems = [...items];

						newItems.push({...defaultObj});
						console.log(newItems)
						setItems(newItems);
					}}
				>
					Add Item
				</Button>
			</Box>
		</Box>
	);
}
