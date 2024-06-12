import { getActions, getComponent } from '$lib/requestMetaData';
import type { DocumentKind } from '$lib/types';
import { extractQueryParam } from '$lib/utils';
import { readRequest, readRequestFeeds } from '$svc/staffrequests';
import { error } from '@sveltejs/kit';

export async function load({ url, params }) {
	const id = params.requestId;
	const type = extractQueryParam(url.search, 'type') as DocumentKind;
	const status = extractQueryParam(url.search, 'status');

	const res = await readRequest(id);
	if (!res.success) {
		error(res.status!, res.message ?? 'Failed to load data');
	}
	const component = getComponent(type as DocumentKind);
	const actions = getActions(
		type as DocumentKind,
		id,
		res.data.applicationStatus || status,
		res.data?.staff?.staffIdentificationNumber ?? ''
	);
	return {
		data: res.data,
		meta: {
			component,
			actions,
			status: type === 'new-registeration' ? res.data.applicationStatus : status,
			feeds: readRequestFeeds(id)
		}
	};
}
