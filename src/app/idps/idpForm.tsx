import { Field } from "@/components/form";
import { Input } from "@/components/inputs";

type Item = {
  item?: {
    id: string;
    name: string;
    description: string;
    endpoint: string;
    protocol: string;
    audience: string;
    groups_claim: string;
  };
};

export default function IdpForm(props: Readonly<Item>) {
  const { item } = props;

  return (
    <>
      <Field>
        <Input
          label="Name"
          name="name"
          placeholder="IDP name"
          defaultValue={item?.name}
          required
        />
      </Field>
      <Field>
        <Input
          label="Description"
          name="description"
          placeholder="IDP description"
          defaultValue={item?.description}
        />
      </Field>
      <Field>
        <Input
          label="Endpoint"
          name="endpoint"
          type="url"
          placeholder="https://auth.example.infn.it"
          defaultValue={item?.endpoint}
          required
        />
      </Field>
      <Field>
        <Input
          label="Protocol"
          name="protocol"
          placeholder="openid"
          defaultValue={item?.protocol}
        />
      </Field>
      <Field>
        <Input
          label="Audience"
          name="audience"
          placeholder="my-aud"
          defaultValue={item?.audience}
        />
      </Field>
      <Field>
        <Input
          label="Groups Claim"
          name="groups_claim"
          placeholder="groups"
          defaultValue={item?.groups_claim}
          required
        />
      </Field>
    </>
  );
}
