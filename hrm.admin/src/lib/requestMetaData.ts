import type { DocumentKind, DocumentStatus, IRequestAction } from './types';

export function getComponent(type: DocumentKind) {
	switch (type) {
		case 'new-registeration':
			return 'staffRegistration';
		case 'bank-update':
			return 'bankUpdate';
		case 'biodata':
			return 'biodata';
		case 'family-details':
			return 'familyDetails';
		case 'accommodation':
			return 'accomodation';
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
										action: 'inlineViewer',
										insertTop: true,
										args: {
											// path: `/staffrecords/${id}/appointmentdetails?applicant=true&polymorphicId=${polymorphicId}&status=${status}`,
											type: 'appointementDetailsForm',
											title: 'Appointment Details',
											props: {
												documentId: id,
												polymorphicId,
												staffNumber: staffNumber
												// size?: IModalSize;
											}
										}
									}
								}

								// {
								// 	kind: 'approve',
								// 	label: 'Postings',
								// 	cmd: {
								// 		action: 'inlineViewer',
								// 		insertTop: true,
								// 		args: {
								// 			type: 'postingDetailsForm',
								// 			title: 'Posting Details',
								// 			// path: `/staffrecords/${staffNumber}/postings?applicant=true&polymorphicId=${polymorphicId}&status=${status}`,
								// 			props: {
								// 				documentId: id,
								// 				polymorphicId,
								// 				staffNumber: staffNumber
								// 			}
								// 		}
								// 	}
								// }
							]
						: status === 'APPOINTED'
							? [
									{
										kind: 'approve',
										label: 'Postings',
										cmd: {
											action: 'inlineViewer',
											insertTop: true,
											args: {
												type: 'postingDetailsForm',
												title: 'Posting Details',
												// path: `/staffrecords/${staffNumber}/postings?applicant=true&polymorphicId=${polymorphicId}&status=${status}`,
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
		case 'family-details':
			buttons = defaultActions(id, polymorphicId, staffNumber);
		case 'accommodation':
			buttons = defaultActions(id, polymorphicId, staffNumber);

		default:
			// console.log('not found', type);
			break;
	}
	return buttons;
}

interface IRecordsActions {
	actions: IRequestAction[];
	supportingDocuments: IRequestAction[];
}

export type IViewerUsage = 'interview' | 'records';

export function getRecordsActions(
	hasAppointment: boolean,
	hasPosting: boolean,
	staffId: string,
	usage: IViewerUsage
): IRecordsActions {
	let data: IRecordsActions = { actions: [], supportingDocuments: [] };

	switch (usage) {
		case 'records':
			if (hasAppointment) {
				data = {
					...data,
					supportingDocuments: [
						...data.supportingDocuments,
						{
							kind: 'approve',
							label: 'Appointment Details',
							cmd: {
								action: 'inlineViewer',
								insertTop: true,
								args: {
									type: 'appointEditor',
									title: 'Appointment Details',
									props: {
										staffNumber: staffId
									}
								}
							}
						}
					]
				};
			} else {
				data = {
					...data,
					actions: [
						...data.actions,
						{
							kind: 'approve',
							label: 'Appointment Details',
							cmd: {
								action: 'inlineViewer',
								insertTop: true,
								args: {
									type: 'appointementDetailsForm',
									title: 'Appointment Details',
									props: {
										staffNumber: staffId
									}
								}
							}
						}
					]
				};
			}
			if (hasPosting) {
				data = {
					...data,
					supportingDocuments: [
						...data.supportingDocuments,
						{
							kind: 'approve',
							label: 'Postings',
							cmd: {
								action: 'inlineViewer',
								insertTop: true,
								args: {
									type: 'postingEditor',
									title: 'Posting Details',
									props: {
										staffNumber: staffId
									}
								}
							}
						}
					]
				};
			} else {
				data = {
					...data,
					actions: [
						...data.actions,
						{
							kind: 'approve',
							label: 'Postings',
							cmd: {
								action: 'inlineViewer',
								insertTop: true,
								args: {
									type: 'postingDetailsForm',
									title: 'Posting Details',
									props: {
										staffNumber: staffId
									}
								}
							}
						}
					]
				};
			}
			break;

		case 'interview':
			data = {
				actions: [
					{
						kind: 'approve',
						label: 'Give Marks',
						cmd: {
							action: 'modalViewer',
							args: {
								type: 'addInterviewMarks',
								title: 'Give Marks',
								props: {
									staffNumber: staffId
								}
							}
						}
					}
				],
				supportingDocuments: [
					{
						kind: 'approve',
						label: 'Appointment Details',
						cmd: {
							action: 'inlineViewer',
							insertTop: true,
							args: {
								type: 'appointEditor',
								title: 'Appointment Details',
								props: {
									staffNumber: staffId
								}
							}
						}
					},
					{
						kind: 'approve',
						label: 'Postings',
						cmd: {
							action: 'inlineViewer',
							insertTop: true,
							args: {
								type: 'postingDetailsForm',
								title: 'Posting Details',
								props: {
									staffNumber: staffId
								}
							}
						}
					}
				]
			};
			break;

		default:
			break;
	}

	return data;
}
