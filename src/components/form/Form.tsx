import InputText from './components/InputText';
import InputSelect from './components/InputSelect';
import InputCheckbox from './components/InputCheckbox';
import InputArray from './components/InputArray';

export default function CreateForm(props: {
	structure: any;
	onChange: any;
	value: string;
}) {
	let form = [];

	/* Iterate every element in the structure */
	for (const key in props.structure) {
		let elem = props.structure[key];

		/* Create the element based on type */
		let jsxElement;
		switch (elem.type) {
			case 'string':
				jsxElement = (
					<InputText
						key={key + '_' + elem.identifier}
						name={key + '_' + elem.identifier}
						elem={elem}
						onChange={props.onChange}
						value={props.value}
					/>
				);
				break;

			case 'select':
				jsxElement = <InputSelect key={key} elem={elem} />;
				break;

			case 'boolean':
				jsxElement = <InputCheckbox key={key} elem={elem} />;
				break;

			case 'array':
				jsxElement = <InputArray key={key} elem={elem} />;
				break;

			case 'object':
				break;
		}

		form.push(jsxElement);
	}

	return form;
}
