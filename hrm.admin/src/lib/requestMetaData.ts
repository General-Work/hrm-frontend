import type { DocumentKind, DocumentStatus, IRequestAction } from './types';

export function getComponent(type: DocumentKind) {
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

function defaultActions(id: string, staffNumber?: string): IRequestAction[] {
	return [
		{
			kind: 'approve',
			label: 'Approve Request',
			cmd: {
				action: 'modalViewer',
				args: {
					type: 'acceptRequest',
					title: 'Approve Request',
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
			label: 'Re-assign Request',
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
}

export function getActions(
	type: DocumentKind,
	id: string,
	status: DocumentStatus,
	staffNumber?: string
) {
  // console.log(status,type)
	let buttons: IRequestAction[] = [];
	if (status !== 'PENDING') return buttons;
	switch (type) {
		case 'new-registeration':
			buttons = defaultActions(id, staffNumber);
			break;
		case 'bank-update':
			buttons = defaultActions(id, staffNumber);
		case 'biodata':
			buttons = defaultActions(id, staffNumber);
		default:
			// console.log('not found', type);
			break;
	}
	return buttons;
}
