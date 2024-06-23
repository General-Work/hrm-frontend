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

function defaultActions(id: string, polymorphicId: string, staffNumber?: string): IRequestAction[] {
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
						polymorphicId,
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
						polymorphicId,
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
						polymorphicId,
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
	polymorphicId: string,
	status: DocumentStatus,
	staffNumber?: string
) {
	// console.log(staffNumber, status);
	let buttons: IRequestAction[] = [];
	if (type !== 'new-registeration' && status !== 'PENDING') return buttons;
	switch (type) {
		case 'new-registeration':
			buttons =
				status === 'PENDING'
					? defaultActions(id, polymorphicId, staffNumber)
					: status === 'APPROVED'
						? [
								{
									kind: 'approve',
									label: 'Appointment Details',
									cmd: {
										action: 'link',
										args: {
											path: `/staffrecords/${id}/appointmentdetails?applicant=true&polymorphicId=${polymorphicId}&status=${status}`,
											type: 'acceptRequest',
											title: 'Approve Request',
											props: {
												documentId: id,
												polymorphicId,
												staffNumber: staffNumber
												// size?: IModalSize;
											}
										}
									}
								}
							]
						: status === 'APPOINTED'
							? [
									{
										kind: 'approve',
										label: 'Postings',
										cmd: {
											action: 'link',
											args: {
												type: 'acceptRequest',
												title: 'Approve Request',
												path: `/staffrecords/${staffNumber}/postings?applicant=true&polymorphicId=${polymorphicId}&status=${status}`,
												props: {
													documentId: id,
													polymorphicId,
													staffNumber: staffNumber
												}
											}
										}
									}
								]
							: [];
			break;
		case 'bank-update':
			buttons = defaultActions(id, polymorphicId, staffNumber);
		case 'biodata':
			buttons = defaultActions(id, polymorphicId, staffNumber);
		default:
			// console.log('not found', type);
			break;
	}
	return buttons;
}
