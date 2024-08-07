import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface InputTextObject {
	description: string;
	required: boolean;
	format: string;
}

export default function InputText(
	props: Readonly<{
		elem: InputTextObject;
		name: string;
		value?: string;
		onChange?: (e: any) => void
	}>
) {
	const [value, setValue] = useState('');
	let tempValue = props.value ?? '';

	if(tempValue !== value) {
		setValue(tempValue)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValue(e.target.value);
		props.onChange?.(e);
	};

	const formatUppercase = props.elem?.format ? props.elem?.format.charAt(0).toUpperCase() + props.elem?.format.slice(1) : '';

	return (
		<TextField
			label={props.elem?.description ?? formatUppercase ?? ''}
			required={props.elem?.required ?? false}
			type='text'
			variant='outlined'
			color='primary'
			sx={{ margin: '0 0 1em 0!important' }}
			value={value}
			name={props.name}
			onChange={handleChange}
			fullWidth
		/>
	);
}
