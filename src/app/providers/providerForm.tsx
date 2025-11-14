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
	disabled?: boolean;
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
					disabled={props.disabled}
				/>
			</Field>
			<Field>
				<Input
					label='Description'
					name='description'
					placeholder='Description Example'
					defaultValue={item?.description}
					required
					disabled={props.disabled}
				/>
			</Field>
			<Field>
				<Input
					label='Auth URL'
					name='auth_endpoint'
					placeholder='https://auth.example.infn.it'
					defaultValue={item?.auth_endpoint}
					required
					disabled={props.disabled}
				/>
			</Field>
			<Field>
				<Checkbox
					name='is_public'
					defaultChecked={item?.is_public}
					label='Is public'
					disabled={props.disabled}
				/>
			</Field>
			<Field>
				<Select
					label='Provider type'
					name='type'
					defaultValue={item?.type ? item?.type : 'openstack'}
					disabled={props.disabled}
				>
					<SelectOption value={'openstack'}>openstack</SelectOption>
					<SelectOption value={'kubernetes'}>kubernetes</SelectOption>
				</Select>
			</Field>
			<Field>
				<Input
					label='Rally username'
					name='rally_username'
					defaultValue={item?.rally_username}
					placeholder='Username'
					required
					disabled={props.disabled}
				/>
			</Field>
			<Field>
				<Input
					label='Rally password'
					name='rally_password'
					defaultValue={item?.rally_password}
					placeholder='Password'
					type='password'
					required
					disabled={props.disabled}
				/>
			</Field>
			<Field>
				<InputList
					label='Image tags'
					name='image_tags'
					placeholder='infn-cloud'
					originalItems={item?.image_tags ?? []}
					disabled={props.disabled}
				></InputList>
			</Field>
			<Field>
				<InputList
					label='Network tags'
					name='network_tags'
					placeholder='infn-cloud'
					originalItems={item?.network_tags ?? []}
					disabled={props.disabled}
				></InputList>
			</Field>
			<Field>
				<InputList
					label='Support Emails'
					name='support_emails'
					placeholder='example@infn.it'
					required
					originalItems={item?.support_emails ?? []}
					disabled={props.disabled}
				></InputList>
			</Field>
			<Field>
				<InputList
					hidden
					label='Site Admins'
					name='site_admins'
					placeholder='Admin'
					originalItems={[userId]}
					disabled={props.disabled}
				></InputList>
			</Field>
		</>
	);
}
