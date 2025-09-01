interface ProviderPageProps {
	params: { id: string };
}

export default function Provider({ params }: ProviderPageProps) {
	const { id } = params;
    
	return <div>Provider Page {id}</div>;
}
