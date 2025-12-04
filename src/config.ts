// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

const fmEndpointUrl = process.env.FM_ENDPOINT_URL;
const fmAuthSecret = process.env.FM_AUTH_SECRET;
const apiServerUrl = process.env.API_SERVER_URL;

const fmOidcUrl = process.env.FM_OIDC_URL;
const fmOidcClientId = process.env.FM_OIDC_CLIENT_ID;
const fmOidcClientSecret = process.env.FM_OIDC_CLIENT_SECRET;
const fmOidcScopes = process.env.FM_OIDC_SCOPES;
const fmOidcProviderId = process.env.FM_OIDC_PROVIDER_ID;

const groupsSiteAdmin = process.env.GROUPS_SITE_ADMIN;
const groupsSiteTester = process.env.GROUPS_SITE_TESTER;
const groupsSlaManager = process.env.GROUPS_SLA_MANAGER;
const groupsAdmin = process.env.GROUPS_ADMIN;

export const settings = {
  fmEndpointUrl,
  fmAuthSecret,
  apiServerUrl,
  fmOidcUrl,
  fmOidcClientId,
  fmOidcClientSecret,
  fmOidcScopes,
  fmOidcProviderId,
  groupsSiteAdmin,
  groupsSiteTester,
  groupsSlaManager,
  groupsAdmin,
};
