import ProjectList from './providerList';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';
import { Suspense } from 'react';
import { LoadingList } from './loading';
import Header from '@/components/header';

export default async function Providers() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />;
	}

	/* const items = [
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
	]; */

	return (
		<>
			<Header
				logo='/logos/infn_logo.png'
				title='Providers'
				subtitle='A Provider is a logical resource provider with geographical zones that collects Projects for quota federation and supports one or more identity providers (IdPs).'
			/>
			<Suspense fallback={<LoadingList />}>
				<List />
			</Suspense>
		</>
	);
}

async function List() {
	const providers = await getProviders();
	const userId = await getUserId();

	return <ProjectList items={providers} userId={userId} />;
}

async function getProviders() {
	const apiResponse = await fetch(`${process.env.BASE_URL}/api/providers`, {
		method: 'GET',
		headers: await headers(),
	});

	const providers = await apiResponse.json();

	return providers.data;
}

async function getUserId() {
	const apiResponse = await fetch(`${process.env.BASE_URL}/api/users/my-id`, {
		method: 'GET',
		headers: await headers(),
	});

	const id = await apiResponse.json();

	return id;
}
