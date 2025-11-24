import { Field, Checkbox } from '@/components/form';
import { Input, InputList } from '@/components/inputs';

type Item = {
	item?: {
		id: string;
		name?: string;
		auth_url?: string;
		is_public?: boolean;
		provider_type?: string;
		image_tags?: Array<string>;
		network_tags?: Array<string>;
		support_emails?: Array<string>;
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
					label='Auth URL'
					name='auth-url'
					placeholder='https://auth.example.infn.it'
					defaultValue={item?.auth_url}
					required
				/>
			</Field>
			<Field>
				<Checkbox
					name='is-public'
					value={item?.is_public}
					label='Is public'
				/>
			</Field>

			<Field>
				<Input
					label='Provider type'
					name='provider-type'
					value={item?.provider_type}
					placeholder='OpenStack'
					required
				/>
			</Field>
			<Field>
				<InputList
					label='Image tags'
					name='image-tags'
					placeholder='infn-cloud'
					required
					originalItems={item?.image_tags ?? []}
				></InputList>
			</Field>
			<Field>
				<InputList
					label='Network tags'
					name='network-tags'
					placeholder='infn-cloud'
					required
					originalItems={item?.network_tags ?? []}
				></InputList>
			</Field>
			<Field>
				<InputList
					label='Support Emails'
					name='support-emails'
					placeholder='example@infn.it'
					required
					originalItems={item?.support_emails ?? []}
				></InputList>
			</Field>
		</>
	);
}
