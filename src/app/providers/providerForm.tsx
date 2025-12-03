import { Field, Checkbox, Select, SelectOption } from "@/components/form";
import { Input, InputList } from "@/components/inputs";

type ProviderFormProps = {
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
    status?: number;
    user_name?: string;
    rally_username?: string;
    test_flavor_name?: string;
    test_network_id?: string;
    floating_ips_enable: boolean;
  };
  userId: string;
  disabled?: boolean;
};

export default function ProviderForm(props: Readonly<ProviderFormProps>) {
  const { item, userId } = props;

  return (
    <>
      <Field>
        <Input
          label="Name"
          name="name"
          placeholder="Provider Example"
          defaultValue={item?.name}
          required
          disabled={props.disabled}
        />
      </Field>
      <Field>
        <Input
          label="Description"
          name="description"
          placeholder="Description Example"
          defaultValue={item?.description}
          disabled={props.disabled}
        />
      </Field>
      <Field>
        <Input
          label="Auth URL"
          type="url"
          name="auth_endpoint"
          placeholder="https://auth.example.infn.it"
          defaultValue={item?.auth_endpoint}
          required
          disabled={props.disabled}
        />
      </Field>
      <Field>
        <Checkbox
          name="is_public"
          defaultChecked={item?.is_public}
          label="Is public"
          disabled={props.disabled}
        />
      </Field>
      <Field>
        <Select
          label="Provider type"
          name="type"
          defaultValue={{ id: "openstack", name: "openstack" }} // FIXME: is this correct?
          disabled={props.disabled}
        >
          <SelectOption value={"openstack"}>openstack</SelectOption>
          <SelectOption value={"kubernetes"}>kubernetes</SelectOption>
        </Select>
      </Field>
      <Field>
        <Input
          label="Rally username"
          name="rally_username"
          defaultValue={item?.rally_username}
          placeholder="Username"
          required
          disabled={props.disabled}
        />
      </Field>
      <Field>
        <Input
          label="Rally password"
          name="rally_password"
          placeholder="Password"
          type="password"
          required={item == undefined}
          disabled={props.disabled}
        />
        {item && (
          <p className="mt-1 text-sm font-medium opacity-50">
            For security reasons the <b>password is not visible</b>. Submitting
            the form with the field filled would overwrite the old one.
          </p>
        )}
      </Field>
      <Field>
        <Input
          label="Rally flavor name"
          name="test_flavor_name"
          defaultValue={item?.test_flavor_name ?? "tiny"}
          placeholder="tiny"
          required
          disabled={props.disabled}
        />
      </Field>
      <Field>
        <Input
          label="Rally network id"
          name="test_network_id"
          defaultValue={item?.test_network_id}
          placeholder="network-id"
          disabled={props.disabled}
        />
      </Field>
      <Field>
        <Checkbox
          name="floating_ips_enable"
          defaultChecked={item?.floating_ips_enable}
          label="Enable floating IPs"
          disabled={props.disabled}
        />
      </Field>
      <Field>
        <InputList
          label="Image tags"
          name="image_tags"
          placeholder="infn-cloud"
          originalItems={item?.image_tags ?? []}
          disabled={props.disabled}
        ></InputList>
      </Field>
      <Field>
        <InputList
          label="Network tags"
          name="network_tags"
          placeholder="infn-cloud"
          originalItems={item?.network_tags ?? []}
          disabled={props.disabled}
        ></InputList>
      </Field>
      <Field>
        <InputList
          label="Support Emails"
          name="support_emails"
          placeholder="example@infn.it"
          required
          type="email"
          originalItems={item?.support_emails ?? []}
          disabled={props.disabled}
        ></InputList>
      </Field>
      <Field>
        <InputList
          hidden
          label="Site Admins"
          name="site_admins"
          placeholder="Admin"
          originalItems={[userId]}
          disabled={props.disabled}
        ></InputList>
      </Field>
    </>
  );
}
