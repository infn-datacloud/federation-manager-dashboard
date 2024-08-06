import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';

interface InputCheckboxObject {
	description: string;
	default: boolean;
	required: boolean;
}

export default function InputCheckbox(
	props: Readonly<{
		elem: InputCheckboxObject;
		name: string;
	}>
) {
	const [value, setValue] = useState(false);

	const handleChange = (e: any) => {
		setValue(e.target.checked);
	};

	return (
		<FormControlLabel
			sx={{ margin: '-9px 0 calc(1em - 9px) 0' }}
			control={
				<Checkbox
					defaultChecked={props.elem?.default}
					value={value}
					onChange={handleChange}
					name={props.name}
				/>
			}
			label={props.elem?.description}
			required={props.elem?.required}
		/>
	);
}
