import { Checkbox, FormControlLabel } from '@mui/material';

interface InputCheckboxObject {
	description: string;
	default: boolean;
	required: boolean;
}

export default function InputCheckbox(
	props: Readonly<{
		elem: InputCheckboxObject;
	}>
) {
	return (
		<FormControlLabel
			control={<Checkbox defaultChecked={props.elem?.default} />}
			label={props.elem?.description}
			required={props.elem?.required}
		/>
	);
}
