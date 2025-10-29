import { Field, Checkbox, Select, SelectOption } from '@/components/form';
import { Input, InputList } from '@/components/inputs';

type IdpFormProps = {
	item?: {
		id: string;
		name?: string;
		description?: string;
		auth_endpoint?: string;
		is_public?: boolean;
		type?: string;
		image_tags?: Array<string>;
		network_tags?: Array<string>;
		support_emails?: Array<string>;
		site_admins?: Array<string>;
		status?: string;
		user_name?: string;
		rally_username?: string;
		rally_password?: string;
		href?: string;
	};
	userId: string;
};

export default function IdpForm(props: Readonly<IdpFormProps>) {
	const { item, userId } = props;

	return (
		<>
			<Field>
				<Input
					label='Name'
					name='name'
					placeholder='Provider Example'
					defaultValue={item?.name}
					required
				/>
			</Field>
			<Field>
				<Input
					label='Description'
					name='description'
					placeholder='Description Example'
					defaultValue={item?.description}
					required
				/>
			</Field>
			<Field>
				<Input
					label='Auth URL'
					name='auth_endpoint'
					placeholder='https://auth.example.infn.it'
					defaultValue={item?.auth_endpoint}
					required
				/>
			</Field>
			<Field>
				<Checkbox
					name='is_public'
					value={item?.is_public}
					label='Is public'
				/>
			</Field>
			<Field>
				<Select
					label='Provider type'
					name='type'
					defaultValue={item?.type ? item?.type : 'openstack'}
				>
					<SelectOption value={'openstack'}>openstack</SelectOption>
					<SelectOption value={'kubernetes'}>kubernetes</SelectOption>
				</Select>
			</Field>
			<Field>
				<Input
					label='Rally username'
					name='rally_username'
					value={item?.rally_username}
					placeholder='Username'
					required
				/>
			</Field>
			<Field>
				<Input
					label='Rally password'
					name='rally_password'
					value={item?.rally_password}
					placeholder='Password'
					type='password'
					required
				/>
			</Field>
			<Field>
				<InputList
					label='Image tags'
					name='image_tags'
					placeholder='infn-cloud'
					originalItems={item?.image_tags ?? []}
				></InputList>
			</Field>
			<Field>
				<InputList
					label='Network tags'
					name='network_tags'
					placeholder='infn-cloud'
					originalItems={item?.network_tags ?? []}
				></InputList>
			</Field>
			<Field>
				<InputList
					label='Support Emails'
					name='support_emails'
					placeholder='example@infn.it'
					required
					originalItems={item?.support_emails ?? []}
				></InputList>
			</Field>
			<Field>
				<InputList
					hidden
					label='Site Admins'
					name='site_admins'
					placeholder='Admin'
					originalItems={[userId]}
				></InputList>
			</Field>
		</>
	);
}
