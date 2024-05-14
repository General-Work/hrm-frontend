import type { IRequestAction, DocumentType, DocumentKind } from '$lib/types';
import { extractQueryParam } from '$lib/utils';
import { readRequest, readRequestFeeds } from '$svc/staffrequests';
import { error } from '@sveltejs/kit';

function getComponet(type: DocumentKind) {
	switch (type) {
		case 'new-registeration':
			return 'staffRegistration';
		case 'bank-update':
			return 'bankUpdate';
		case 'biodata':
			return 'biodata';
		default:
			// console.log('not found', type);
			return null;
	}
}
function getActions(type: DocumentKind, id: string, staffNumber?: string) {
	let buttons: IRequestAction[] = [];
	switch (type) {
		case 'new-registeration':
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
				},
				{
					kind: 'reject',
					label: 'Reject Request',
					// subLabel?: string;
					cmd: {
						action: 'modalViewer',
						args: {
							type: 'rejectRequest',
							title: 'Reject Request',
							props: {
								documentId: id,
								staffNumber: staffNumber
								// size?: IModalSize;
							}
						}
					}
				},
				{
					kind: 'transfer',
					label: 'Transfer Request',
					cmd: {
						action: 'modalViewer',
						args: {
							type: 'transferRequest',
							title: 'Transfer Request',
							props: {
								documentId: id,
								staffNumber: staffNumber
								// size?: IModalSize;
							}
						}
					}
				}
			];
			break;
		case 'bank-update':
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
				},
				{
					kind: 'reject',
					label: 'Reject Request',
					// subLabel?: string;
					cmd: {
						action: 'modalViewer',
						args: {
							type: 'rejectRequest',
							title: 'Reject Request',
							props: {
								documentId: id,
								staffNumber: staffNumber
								// size?: IModalSize;
							}
						}
					}
				}
			];
		default:
			// console.log('not found', type);
			break;
	}
	return buttons;
}
export async function load({ url, params }) {
	// const paths = url.pathname.split('/');
	const id = params.requestId;
	const type = extractQueryParam(url.search, 'type') as DocumentKind;
	const res = await readRequest(type, id);
	// console.log(res);
	if (!res.success) {
		error(res.status!, res.message ?? 'Failed to load data');
	}
	const component = getComponet(type as DocumentKind);
	const actions = getActions(type as DocumentKind, id, 'MS0012');
	// console.log(actions)
	return {
		data: res.data,
		meta: {
			component,
			actions,
			status: type === 'new-registeration' ? res.data.applicationStatus : '-',
			feeds: readRequestFeeds(id)
		}
	};
}
