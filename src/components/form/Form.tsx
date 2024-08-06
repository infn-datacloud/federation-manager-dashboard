import InputText from './components/InputText';
import InputSelect from './components/InputSelect';
import InputCheckbox from './components/InputCheckbox';
import InputArray from './components/InputArray';

export default function CreateForm(props: {
	structure: any;
	onChange?: () => {};
}) {
	let form = [];

	/* Iterate every element in the structure */
	for (const key in props.structure) {
		let elem = props.structure[key];

		/* Create the element based on type */
		let jsxElement;
		switch (elem.type) {
			case 'string':
				jsxElement = <InputText key={key} name={key} elem={elem} onChange={props.onChange} value={elem.value} />;
				break;

			case 'select':
				jsxElement = <InputSelect key={key} name={key} elem={elem} />;
				break;

			case 'boolean':
				jsxElement = <InputCheckbox key={key} name={key} elem={elem} />;
				break;

			case 'array':
				jsxElement = <InputArray key={key} name={key} elem={elem} />;
				break;

			case 'object':
				break;
		}

		if (jsxElement) {
			form.push(jsxElement);
		}
	}

	return form;
}
