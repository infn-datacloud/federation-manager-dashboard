import { Field, Select, SelectOption } from '@/components/form';
import { Input } from '@/components/inputs';

type Item = {
	item?: {
		idp_id: string;
		overrides: {
			name: string;
			protocol: string;
			audience: string;
			groups_claim: string;
		};
	},
    idps: idpsProps
};

type idpsProps = Array<{
	id: string;
	name: string;
	protocol: string;
	audience: string;
	groups_claim: string;
}>;

export default function IdpForm(props: Readonly<Item>) {
	const { item, idps } = props;

	return (
		<>
			<Field hidden={item?.idp_id ? true : false}>
				<SelectIDP />
			</Field>
			<Field>
				<Input
					label='Name'
					name='name'
					placeholder='My name'
					required
					defaultValue={item?.overrides.name}
				/>
			</Field>
			<Field>
				<Input
					label='Protocol'
					name='protocol'
					placeholder='openid'
					defaultValue={item?.overrides.protocol}
				/>
			</Field>
			<Field>
				<Input
					label='Audience'
					name='audience'
					placeholder='my-aud'
					defaultValue={item?.overrides.audience}
				/>
			</Field>
			<Field>
				<Input
					label='Groups claim'
					name='groups_claim'
					placeholder='my-group'
					defaultValue={item?.overrides.groups_claim}
				/>
			</Field>
		</>
	);

	function SelectIDP() {
		const selectedIdp = item?.idp_id ? idps.filter(idp => { return idp.id == item?.idp_id; })[0] : idps[0];

		const options = idps.map((item, index) => {
			return (
				<SelectOption
					key={index}
					value={{ id: item.id, name: item.name }}
				>
					{item.name}
				</SelectOption>
			);
		});

		return (
			<>
				<Select
					label='IDP'
					name='idp'
					defaultValue={{ id: selectedIdp.id, name: selectedIdp.name }}
				>
					{options}
				</Select>
			</>
		);
	}
}
