import { Field, Label, Select, SelectOption } from "@/components/form";
import { Input } from "@/components/inputs";

type Item = {
  item?: {
    id: string;
    name: string;
    provider: string;
  };
  projects: Array<{
    id: string;
    name: string;
    provider_name: string;
  }>;
};

export default function ProjectForm(props: Readonly<Item>) {
  const { item, projects } = props;

  const items = projects?.map((item) => (
    <SelectOption
      key={item.id}
      value={{ id: item.id, name: `${item.provider_name} - ${item.name}` }}
    >
      {item.provider_name} - {item.name}
    </SelectOption>
  ));

  if (items.length === 0) {
    return (
      <>
        <p>
          No available projects. Please ask a <b>SITE ADMIN</b> to add a project
          in a <b>READY</b> state first.
        </p>
      </>
    );
  }

  const selectedProject = { // FIXME: consider using 'item.id' property
    id: projects[0].id,
    name: projects[0].provider_name + " - " + projects[0].name,
  };

  return (
    <>
      <Field>
        <Input name="id" defaultValue={item?.id} hidden />
      </Field>
      <Field>
        <Label data-required>Project</Label>
        <Select name="project_id" defaultValue={selectedProject}>
          {items}
        </Select>
      </Field>
    </>
  );
}
