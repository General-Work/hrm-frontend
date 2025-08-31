import type { DocumentKind, DocumentStatus, IRequestAction, IRequestStatus } from './types';

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
		case 'professional-licence':
			return 'professionalLicence';

		case 'children-details':
			return 'childrenRequest';
		default:
			// console.log('not found', type);
			return null;
	}
}

function defaultActions(
	id: string,
	polymorphicId: string,
	documentType: DocumentKind,
	staffNumber?: string
): IRequestAction[] {
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
						staffNumber: staffNumber,
						documentType
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
						staffNumber: staffNumber,
						documentType

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
						staffNumber: staffNumber,
						documentType

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
					? defaultActions(id, polymorphicId, type, staffNumber)
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
												staffNumber: staffNumber,
												documentType: type

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
													staffNumber: staffNumber,
													documentType: type
												}
											}
										}
									}
								]
							: [];
			break;
		case 'bank-update':
			buttons = defaultActions(id, polymorphicId, type, staffNumber);
		case 'biodata':
			buttons = defaultActions(id, polymorphicId, type, staffNumber);
		case 'family-details':
			buttons = defaultActions(id, polymorphicId, type, staffNumber);
		case 'accommodation':
			buttons = defaultActions(id, polymorphicId, type, staffNumber);

		case 'professional-licence':
			buttons = defaultActions(id, polymorphicId, type, staffNumber);

		case 'children-details':
			buttons = defaultActions(id, polymorphicId, type, staffNumber);

		default:
			// console.log('not found', type);
			break;
	}
	return buttons;
}

export function getSupportingData(
	type: DocumentKind,
	id: string,
	status: IRequestStatus,
	data?: any,
	staffNumber?: string
) {
	if (status !== 'PENDING') {
		return [];
	}
	let returnData;

	switch (type) {
		case 'professional-licence':
			returnData = [
				{
					kind: 'file',
					label: 'Current Details',
					cmd: {
						action: 'inlineViewer',
						args: {
							type: 'professionalLicence',
							title: 'Current Details',
							props: {
								documentId: id,
								documentType: type,
								data,
								staffNumber: staffNumber,
								hideTitle: true
							}
						}
					}
				}
			];
			break;

		case 'accommodation':
			returnData = [
				{
					kind: 'file',
					label: 'Current Details',
					cmd: {
						action: 'inlineViewer',
						args: {
							type: 'accomodation',
							title: 'Current Details',
							props: {
								documentId: id,
								documentType: type,
								data,
								staffNumber: staffNumber,
								hideTitle: true
							}
						}
					}
				}
			];
			break;

		case 'bank-update':
			returnData = [
				{
					kind: 'file',
					label: 'Current Details',
					cmd: {
						action: 'inlineViewer',
						args: {
							type: 'bankUpdate',
							title: 'Current Details',
							props: {
								documentId: id,
								documentType: type,
								data,
								staffNumber: staffNumber,
								hideTitle: true
							}
						}
					}
				}
			];
			break;

		case 'biodata':
			returnData = [
				{
					kind: 'file',
					label: 'Current Details',
					cmd: {
						action: 'inlineViewer',
						args: {
							type: 'biodata',
							title: 'Current Details',
							props: {
								documentId: id,
								documentType: type,
								data,
								staffNumber: staffNumber,
								hideTitle: true
							}
						}
					}
				}
			];
			break;

		case 'family-details':
			returnData = [
				{
					kind: 'file',
					label: 'Current Details',
					cmd: {
						action: 'inlineViewer',
						args: {
							type: 'familyDetails',
							title: 'Current Details',
							props: {
								documentId: id,
								documentType: type,
								data,
								staffNumber: staffNumber,
								hideTitle: true
							}
						}
					}
				}
			];
			break;

		case 'children-details':
			returnData = [
				{
					kind: 'file',
					label: 'Current Details',
					cmd: {
						action: 'inlineViewer',
						args: {
							type: 'childrenRequest',
							title: 'Current Details',
							props: {
								documentId: id,
								documentType: type,
								data,
								staffNumber: staffNumber,
								hideTitle: true
							}
						}
					}
				}
			];
			break;
	}
	return returnData;
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
	usage: IViewerUsage,
	dbId?: string
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
									updatable: true,
									props: {
										staffNumber: staffId,
										staffDbId: dbId
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
										staffNumber: staffId,
										staffDbId: dbId
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
									updatable: true,
									type: 'postingEditor',
									title: 'Posting Details',
									props: {
										staffNumber: staffId,
										staffDbId: dbId
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
										staffNumber: staffId,
										staffDbId: dbId
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
									staffNumber: staffId,
									staffDbId: dbId
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
									staffNumber: staffId,
									staffDbId: dbId
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
									staffNumber: staffId,
									staffDbId: dbId
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
