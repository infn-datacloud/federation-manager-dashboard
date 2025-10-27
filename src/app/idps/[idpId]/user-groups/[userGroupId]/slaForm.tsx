import { Field } from '@/components/form';
import { Input } from '@/components/inputs';

type Item = {
	item?: {
		id: string;
		name: string;
		description: string;
		url: string;
		startDate: string;
		endDate: string;
	};
};

export default function SlaForm(props: Readonly<Item>) {
    const { item } = props;

    return (
		<>
			<Field>
				<Input name='id' defaultValue={item?.id} hidden />
			</Field>
			<Field>
				<Input
					label='Name'
					name='name'
					placeholder='Example name'
					defaultValue={item?.name}
					required
				/>
			</Field>
			<Field>
				<Input
					label='Description'
					name='description'
					placeholder='Example description'
					defaultValue={item?.description}
					required
				/>
			</Field>
			<Field>
				<Input
					label='Url'
					name='url'
					placeholder='https://www.example.com'
					defaultValue={item?.url}
					required
				/>
			</Field>
			<Field>
				<Input
					label='Start Date'
					name='start_date'
					placeholder='yyyy-mm-dd'
					defaultValue={item?.startDate}
					required
				/>
			</Field>
			<Field>
				<Input
					label='end Date'
					name='end_date'
					placeholder='yyyy-mm-dd'
					defaultValue={item?.endDate}
					required
				/>
			</Field>
		</>
	);
}
