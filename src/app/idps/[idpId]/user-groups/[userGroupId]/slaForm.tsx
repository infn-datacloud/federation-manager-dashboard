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

	// Generic date adjuster (add or subtract)
	const adjustDate = (dateStr: string, days: number) => {
		const d = new Date(dateStr);
		d.setDate(d.getDate() + days);
		return d.toISOString().split('T')[0];
	};

	// Initial state uses the adjustDate function
	const [maxStart, setMaxStart] = useState(
		item?.end_date ? adjustDate(item.end_date, -1) : ''
	);

	const [minEnd, setMinEnd] = useState(
		item?.start_date ? adjustDate(item.start_date, 1) : ''
	);

	// Handlers that apply the date offset
	const handleStartChange = (value: string) => {
		setMinEnd(adjustDate(value, 1));
	};

	const handleEndChange = (value: string) => {
		setMaxStart(adjustDate(value, -1));
	};

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
					onChange={handleStartChange}
				/>
			</Field>

			<Field>
				<Datetime
					label='End Date'
					name='end_date'
					value={item?.end_date}
					required
					min={minEnd}
					onChange={handleEndChange}
				/>
			</Field>
		</>
	);
}
