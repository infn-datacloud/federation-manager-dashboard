import InputText from './components/InputText';
import InputSelect from './components/InputSelect';
import InputCheckbox from './components/InputCheckbox';
import InputArray from './components/InputArray';
import InputObject from './components/InputObject';

export default function CreateForm(props: {
	structure: any;
	onChange?: () => {};
}) {
	let form = [];

	/* Iterate every element in the structure */
	for (let key in props.structure) {
		let elem = props.structure[key];

		/* Create the element based on type */
		let jsxElement;
		switch (elem.type) {
			case 'string':
				jsxElement = (
					<InputText
						key={key}
						name={key}
						elem={elem}
						onChange={props.onChange}
						value={elem.value}
					/>
				);
				break;
			
			case 'number':
				jsxElement = (
					<InputText
						key={key}
						name={key}
						elem={elem}
						onChange={props.onChange}
						value={elem.value}
						type='number'
					/>
				);
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
				jsxElement = <InputObject key={key} elem={elem.properties} description={elem.description}/>
				break;
		}

		if (jsxElement) {
			form.push(jsxElement);
		}
	}

	return form;
}
