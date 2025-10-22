import { Field, Checkbox } from '@/components/form';
import { Input, InputList } from '@/components/inputs';

type Item = {
	item?: {
		id: string;
		name?: string;
		description?: string;
		auth_url?: string;
		is_public?: boolean;
		provider_type?: string;
		image_tags?: Array<string>;
		network_tags?: Array<string>;
		support_emails?: Array<string>;
		site_admins?: Array<string>;
		status?: string;
		user_name?: string;
		href?: string;
	};
};

export default function IdpForm(props: Readonly<Item>) {
	const { item } = props;

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
					defaultValue={item?.auth_url}
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
				<Input
					label='Provider type'
					name='type'
					value={item?.provider_type}
					placeholder='OpenStack'
					required
				/>
			</Field>
			<Field>
				<InputList
					label='Image tags'
					name='image_tags'
					placeholder='infn-cloud'
					required
					originalItems={item?.image_tags ?? []}
				></InputList>
			</Field>
			<Field>
				<InputList
					label='Network tags'
					name='network_tags'
					placeholder='infn-cloud'
					required
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
					label='Site Admins'
					name='site_admins'
					placeholder='Admin'
					required
					originalItems={item?.site_admins ?? []}
				></InputList>
			</Field>
		</>
	);
}
