export default function Home() {
	return (
		<>
			<h1>Federation Manager</h1>

			<h2>Providers List</h2>
			<ul>
				<li><a href="/providers/1">Provider 1</a></li>
				<li><a href="/providers/2">Provider 2</a></li>
				<li><a href="/providers/3">Provider 3</a></li>
			</ul>
			<br />
			<a href="/providers/request">New Reuest +</a>
		</>
	);
}
