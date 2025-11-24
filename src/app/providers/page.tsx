import ProjectList from "./projectList";

export default function Providers() {
	const items = [
		{
			id: '15',
			name: 'Provider One',
			status: '0',
			user_name: '',
			href: '',
		},
		{
			id: '2',
			name: 'Provider One',
			status: 'not ID',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '3',
			name: 'Provider One',
			status: '0',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '4',
			name: 'Provider One',
			status: '1',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '5',
			name: 'Provider One',
			status: '2',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '6',
			name: 'Provider One',
			status: '3',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '7',
			name: 'Provider One',
			status: '4',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '8',
			name: 'Provider One',
			status: '5',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '9',
			name: 'Provider One',
			status: '6',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '10',
			name: 'Provider One',
			status: '7',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '11',
			name: 'Provider One',
			status: '8',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '12',
			name: 'Provider One',
			status: '9',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '13',
			name: 'Provider One',
			status: '10',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
	];


	return (
		<>
			<ProjectList items={items} />
		</>
	);
}
