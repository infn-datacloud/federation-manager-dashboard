import { Field, Label, Select, SelectOption } from '@/components/form';
import { Input } from '@/components/inputs';

type Item = {
	item?: {
		id: string;
		name: string;
		provider: string;
	};
};

export default function ProjectForm(props: Readonly<Item>) {
	const { item } = props;

	const projects = [
		{
			id: '0',
			name: 'Intertwin',
		},
		{
			id: '1',
			name: 'Terabit',
		},
		{
			id: '2',
			name: 'ICSC',
		},
	];

	const items = projects?.map((item) => (
		<SelectOption key={item.id} value={item}>
			{item.name}
		</SelectOption>
	));

	return (
		<>
			<Field>
				<Input name='id' defaultValue={item?.id} hidden />
			</Field>
			<Field>
				<Label data-required>Projects</Label>
				<Select name='project' defaultValue={projects[0]}>
					{items}
				</Select>
			</Field>
		</>
	);
}
