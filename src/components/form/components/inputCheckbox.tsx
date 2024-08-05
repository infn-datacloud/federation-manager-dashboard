import { Checkbox, FormControlLabel } from '@mui/material';

interface InputCheckboxObject {
	description: string;
	default: boolean;
	required: boolean;
}

export default function inputCheckbox(key: string, elem: InputCheckboxObject) {
	// console.log('CHECKBOX', elem);
	return (
		<FormControlLabel
			key={key}
			control={<Checkbox defaultChecked={elem?.default} />}
			label={elem?.description}
			required={elem?.required}
		/>
	);
}
