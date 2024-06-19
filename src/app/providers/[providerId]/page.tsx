export default function Provider({ params }: {
	params: { providerId: string }
}) {
    return (
		<>
			<h1>Provider "{ params.providerId }"</h1>
		</>
    );
}
