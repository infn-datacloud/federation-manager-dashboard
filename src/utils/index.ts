import jwt from 'jsonwebtoken';
import getAuthToken from '@/app/api/utils';

export async function findUserRoles() {
	const accessToken = await getAuthToken();
	const decoded = jwt.decode(accessToken!);

	type JwtPayloadWithGroups = {
		groups?: string[];
	};

	const groups = (decoded as JwtPayloadWithGroups)?.groups;
	const userRoles: string[] = [];

	const siteAdminGroups = JSON.parse(process.env.SITE_ADMIN_GROUPS!)[
		process.env.IAM_ISSUER_URL!
	];
	const siteTesterGroups = JSON.parse(process.env.SITE_TESTER_GROUPS!)[
		process.env.IAM_ISSUER_URL!
	];
	const slaManagerGroups = JSON.parse(process.env.SLA_MANAGER_GROUPS!)[
		process.env.IAM_ISSUER_URL!
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
