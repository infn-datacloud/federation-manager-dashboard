import { Field, Label, Select, SelectOption } from '@/components/form';
import { Input } from '@/components/inputs';

type Item = {
	item?: {
		id: string;
		name: string;
		provider: string;
	};
	projects: Array<{
		id: string;
		name: string;
	}>;
};

export default function ProjectForm(props: Readonly<Item>) {
	const { item, projects } = props;

	console.log(item, projects)

	const items = projects?.map((item) => (
		<SelectOption key={item.id} value={{ id: item.id, name: item.name }}>
			{item.name}
		</SelectOption>
	));

	const selectedProgect = item?.id
		? item.id
		: {
				id: projects[0].id,
				name: projects[0].name,
		  };

	return (
		<>
			<Field>
				<Input name='id' defaultValue={item?.id} hidden />
			</Field>
			<Field>
				<Label data-required>Project</Label>
				<Select name='project_id' defaultValue={selectedProgect}>
					{items}
				</Select>
			</Field>
		</>
	);
}
