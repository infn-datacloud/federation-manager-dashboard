import { TextField } from "@mui/material";

interface InputTextObject {
    description: string;
    required: boolean;
	value: string;
}

export default function InputText(props: Readonly<{
	elem: InputTextObject
	value: string
	name: string
	onChange: (value: string) => void
}>) {
	return (
		<TextField
			label={props.elem?.description}
            required={props.elem?.required}
            type='text'
			variant='outlined'
			color='primary'
			sx={{ margin: '8px 0!important' }}
			value={props.elem.value}
			name={props.name}
			onChange={(e) => {
				props.onChange(e, e.target.value);
			}}
			fullWidth
		/>
	);
}
