import { getActions, getComponent } from '$lib/requestMetaData';
import type { DocumentKind } from '$lib/types';
import { extractQueryParam } from '$lib/utils';
import { readRequest, readRequestFeeds } from '$svc/staffrequests';
import { error } from '@sveltejs/kit';

export async function load({ url, params }) {
	const id = params.requestId;
	const type = extractQueryParam(url.search, 'type') as DocumentKind;
	const status = extractQueryParam(url.search, 'status');
	const polymorphicId = extractQueryParam(url.search, 'polymorphicId');
	const staffId = extractQueryParam(url.search, 'staffId');
	const res = await readRequest(id);
	// console.log(res);
	if (!res.success) {
		error(400, res.message ?? 'Failed to load data');
	}
	const component = getComponent(type as DocumentKind);
	const currentStatatus =
		type === 'new-registeration' &&
		res.data.applicationStatus !== 'PENDING' &&
		res.data.applicationStatus !== 'APPROVED'
			? res.data.applicationStatus
			: status;
	const actions = getActions(
		type as DocumentKind,
		id,
		polymorphicId,
		currentStatatus,
		res.data?.staff?.staffIdentificationNumber || staffId
	);
	return {
		data: res.data,
		meta: {
			component,
			actions,
			status: currentStatatus,
			feeds: readRequestFeeds(id)
		}
	};
}
