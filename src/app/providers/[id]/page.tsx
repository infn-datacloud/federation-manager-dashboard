type ProviderPageProps = Promise<{ id: string }>;

export  default async function Provider({ params }: { params: ProviderPageProps }) {
	const { id } = await params;

	return <div>Provider Page {id}</div>;
}
