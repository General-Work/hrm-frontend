import { readRequest, readRequestFeeds } from '$svc/staffrequests';
import { extractQueryParam } from '$types/utils/index.js';
import type { DocumentType, IRequestAction } from '$types/types/index.js';
import { error } from '@sveltejs/kit';

function getComponet(type: DocumentType) {
	switch (type) {
		case 'STAFF REGISTRATION':
			return 'staffRegistration';
		case 'ANNUAL LEAVE PLAN':
			return 'annualLeavePlan';
		default:
			console.log('not found', type);
			return null;
	}
}
function getActions(type: DocumentType, id: string, staffNumber?: string) {
	let buttons: IRequestAction[] = [];
	switch (type) {
		case 'STAFF REGISTRATION':
			buttons = [
				{
					kind: 'approve',
					label: 'Accept Request',
					// subLabel?: string;
					cmd: {
						action: 'modalViewer',
						args: {
							type: 'acceptRequest',
							title: 'Accept Request',
							props: {
								documentId: id,
								staffNumber: staffNumber
								// size?: IModalSize;
							}
						}
					}
				}
			];
			return buttons;

		default:
			console.log('not found', type);
			return buttons;
	}
}
export async function load({ url, params }) {
	// const paths = url.pathname.split('/');
	const id = params.requestId;
	const type = extractQueryParam(url.search, 'type');
	const res = await readRequest(id);
	if (!res.success) {
		error(res.status, res.message ?? 'Failed to load data');
	}
	const component = getComponet(type as DocumentType);
	const actions = getActions(type as DocumentType, id);
	// console.log(actions)
	return {
		data: res.data,
		meta: { component, actions, status: 'PENDING', feeds: readRequestFeeds(id) }
	};
}
