import { Field } from '@/components/form';
import { Input } from '@/components/inputs';

type Item = {
    item?: {
        id: string;
        name: string;
        description: string;
    };
};

export default function UserGroupForm(props: Readonly<Item>) {
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
		</>
	);
}
