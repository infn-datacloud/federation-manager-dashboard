import getAuthToken from '@/app/api/ssr/utils';

export async function findUserRoles() {
	const accessToken = await getAuthToken();
	const decoded = decodeJwtPayload(accessToken!);

	type JwtPayloadWithGroups = {
		groups?: string[];
	};

	const groups = (decoded as JwtPayloadWithGroups)?.groups;
	const userRoles: string[] = [];

	const siteAdminGroups = JSON.parse(process.env.GROUPS_SITE_ADMIN!)[
		`${process.env.FM_OIDC_URL!}/`
	];
	const siteTesterGroups = JSON.parse(process.env.GROUPS_SITE_TESTER!)[
		`${process.env.FM_OIDC_URL!}/`
	];
	const slaManagerGroups = JSON.parse(process.env.GROUPS_SLA_MANAGER!)[
		`${process.env.FM_OIDC_URL!}/`
	];

	groups?.forEach((group) => {
		if (siteAdminGroups) {
			if (
				siteAdminGroups.includes(group) &&
				!userRoles.includes('site-admin')
			) {
				userRoles.push('site-admin');
			}
		}

		if (siteTesterGroups) {
			if (
				siteTesterGroups.includes(group) &&
				!userRoles.includes('site-tester')
			) {
				userRoles.push('site-tester');
			}
		}

		if (slaManagerGroups) {
			if (
				slaManagerGroups.includes(group) &&
				!userRoles.includes('sla-manager')
			) {
				userRoles.push('sla-manager');
			}
		}
	});

	return userRoles;
}

export function decodeJwtPayload(token: string) {
	if (token) {
		return JSON.parse(atob(token.split('.')[1]));
	} else {
		return {};
	}
}
