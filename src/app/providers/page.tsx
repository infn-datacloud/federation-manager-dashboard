import ProviderList from './providerList';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';
import { Suspense } from 'react';
import { LoadingList } from './loading';
import Header from '@/components/header';

type ProvierProps = {
	id: string;
	name: string;
	description: string;
	auth_url?: string;
	is_public?: boolean;
	provider_type?: string;
	image_tags?: Array<string>;
	network_tags?: Array<string>;
	support_emails?: Array<string>;
	site_admins?: Array<string>;
	site_testers?: Array<string>;
	status: string;
	user_name: string;
	href: string;
	site_tester_name: string;
};

type UserProps = {
	id: string;
	name: string;
	email: string;
	issuer: string;
	sub: string;
};

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

	const userRoles = process.env.USER_ROLES
		? process.env.USER_ROLES.split(',')
		: [];

	return (
		<ProviderList items={providers} userId={userId} userRoles={userRoles} />
	);
}

async function getProviders() {
	const apiResponse = await fetch(
		`${process.env.FM_ENDPOINT_URL}/api/ssr/providers`,
		{
			method: 'GET',
			headers: await headers(),
		}
	);

	const providers = await apiResponse.json();
	const updatedProviders = await assignSiteTesterNames(providers.data);

	return updatedProviders;
}

async function getUsers() {
	const apiResponse = await fetch(
		`${process.env.FM_ENDPOINT_URL}/api/ssr/users`,
		{
			method: 'GET',
			headers: await headers(),
		}
	);

	const users = await apiResponse.json();

	return users.data;
}

async function getUserId() {
	const apiResponse = await fetch(
		`${process.env.FM_ENDPOINT_URL}/api/ssr/users/my-id`,
		{
			method: 'GET',
			headers: await headers(),
		}
	);

	const id = await apiResponse.json();

	return id;
}

async function assignSiteTesterNames(providers: Array<ProvierProps>) {
	const users = await getUsers();

	providers.forEach((provider) => {
		const user = users.filter((user: UserProps) => {
			return (
				provider?.site_testers &&
				provider.site_testers.length > 0 &&
				user.id == provider.site_testers[0]
			);
		});

		if (user.length > 0) {
			provider.site_tester_name = user[0].name;
		}
	});

	return providers;
}
