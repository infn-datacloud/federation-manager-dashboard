import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface InputSelectObject {
	description: string;
	required: boolean;
	default: string;
	enum: Array<string>;
}

export default function InputSelect(
	props: Readonly<{
		elem: InputSelectObject;
	}>
) {
	const [value, setValue] = React.useState(props.elem.default);
	let items = [];

	const handleChange = (e: SelectChangeEvent) => {
		setValue(e.target.value);
	};

	for (let elem of props.elem.enum) {
		items.push(
			<MenuItem key={elem} value={elem}>
				{elem}
			</MenuItem>
		);
	}

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel>{props.elem.description}</InputLabel>
				<Select
					value={value}
					label={props.elem.description}
					onChange={handleChange}
				>
					{items}
				</Select>
			</FormControl>
		</Box>
	);
}
