import { Field } from '@/components/form';
import { Datetime } from '@/components/form/datetime';
import { Input } from '@/components/inputs';
import { useState } from 'react';

type Item = {
	item?: {
		id: string;
		name: string;
		description: string;
		url: string;
		start_date: string;
		end_date: string;
	};
};

export default function SlaForm(props: Readonly<Item>) {
    const { item } = props;

	const [maxStart, setMaxStart] = useState(item?.end_date || '');
	const [minEnd, setMinEnd] = useState(item?.start_date || '');

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
				/>
			</Field>
			<Field>
				<Input
					label='Url'
					name='url'
					type='url'
					placeholder='https://www.example.com'
					defaultValue={item?.url}
					required
				/>
			</Field>
			<Field>
				<Datetime
					label='Start Date'
					name='start_date'
					value={item?.start_date}
					required
					max={maxStart}
					onChange={(e) => {
						setMinEnd(e);
					}}
				/>
			</Field>
			<Field>
				<Datetime
					label='end Date'
					name='end_date'
					value={item?.end_date}
					required
					min={minEnd}
					onChange={(e) => {
						setMaxStart(e);
					}}
				/>
			</Field>
		</>
	);
}
