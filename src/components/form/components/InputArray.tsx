import { Box, Button, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CreateForm from '../Form';

import { useEffect, useState } from 'react';
import InputText from './InputText';

interface InputArrayObject {
	description: string;
	items: any;
	required: boolean;
	minItems: number;
}

function SingleItem(
	props: Readonly<{
		type: any;
		onChange: any;
		items: any;
		onRemove: any;
		canRemove: boolean;
		name: string;
		value: string;
	}>
) {
	if (props.items.type == 'string') {
		return (
			<Box display='flex' alignItems='center' sx={{ position: 'relative' }}>
				<InputText
					name={props.name}
					elem={{
						description: props.items.description,
						required: props.items.required,
						format: props.items.format,
					}}
					onChange={props.onChange}
					value={props.value}
				/>
				<Box
					sx={{
						background: 'white',
						border: '1px solid #d32f2f',
						borderRadius: '50%',
						display: !props.canRemove ? 'none' : undefined,
						position: 'absolute',
						right: '0px',
						top: '-10px',
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
					padding: '1em 1em 0 1em',
					margin: '0 0 1em 0',
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
						width: '98%',
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
				/>
			</Box>
		);
	}
}

export default function InputArray(
	props: Readonly<{
		elem: InputArrayObject;
		name: string;
	}>
) {
	const tempItems = JSON.parse(JSON.stringify(props.elem.items));

	const defaultObj = {
		type: props.elem.items.type,
		format: props.elem.items.format,
		items: tempItems,
		value: '',
		index: 0
	};

	let itemsList = [];
	for (let i = 0; i < props.elem.minItems; i++) {
		itemsList.push(defaultObj);
	}

	const [items, setItems] = useState(itemsList);
	const [canRemove, setCanRemove] = useState(false);

	const handleChange = (e: any, index: number) => {
		let newItems = [...items];
		let name = e.target.name;
		let value = e.target.value;

		if (newItems[index].items.type == 'string') {
			newItems[index].value = value;
		} else {
			newItems[index].items.properties[name].value = value;
		}

		setItems(newItems);

		/* let newItems = [...items];
		if (newItems[index].items.type == 'string') {
			newItems[index].value = value;
		} else {
			let name = e.target.name.split('_');
			name.pop();
			name = name.join('_');

			let elem = newItems[index].items.properties[name];
			if (elem) {
				elem.value = value;
			}
		}

		setItems(newItems); */
	};

	const handleRemove = (index: number) => {
		if (canRemove) {
			let newItems = [...items];
			newItems.splice(index, 1);
			setItems(newItems);
		}
	};

	useEffect(() => {
		setCanRemove(items.length > props.elem.minItems);

		items.map((item, i) => {
			item.index = i;
			return item;
		})

		console.log(items)
	}, [items]);

	let components = [];

	for (let i in items) {
		components.push(
			<SingleItem
				key={i}
				name={props.name + '_' + i}
				onChange={(e: any) =>
					handleChange(e, Number(i))
				}
				onRemove={() => handleRemove(Number(i))}
				canRemove={canRemove}
				{...items[i]}
			/>
		);
	}

	return (
		<Box
			sx={{
				border: '2px solid #162d4d99',
				borderRadius: '25px',
				padding: '1.5em 1em 1em',
				margin: '0 0 1em 0',
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
					onClick={() => {
						let newItems = [...items];
						newItems.push({ ...defaultObj });
						setItems(newItems);
					}}
				>
					Add Item
				</Button>
			</Box>
		</Box>
	);
}
