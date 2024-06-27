import type { IButtonConfig } from '$cmps/ui/cardButton.svelte';
import { getRecordsActions } from '$lib/recordsActions.js';
import type { DocumentStatus, IStaff, IStaffByID, IStaffHeader } from '$lib/types';
import { extractQueryParam, isStaffNumber } from '$lib/utils';
import { readStaffById, readStaffs } from '$svc/staff/index.js';
import { readRequest } from '$svc/staffrequests/home';

const actionsButtons: IButtonConfig[] = [
	{
		label: 'Appointment Details',
		kind: 'form',
		subLabel: '',
		path: '/appointmentdetails'
	},
	{
		label: 'Postings',
		kind: 'generic',
		subLabel: '',
		path: '/postings',
		icon: 'clarity:file-group-solid'
		// iconBgColor: 'bg-green-100',
		// iconColor: 'text-green-500'
	}
	// {
	// 	label: 'Excuse Duty',
	// 	kind: 'generic',
	// 	icon: 'iconoir:healthcare',
	// 	subLabel: 'Request for an excuse duty',
	// 	path: ''
	// }
];

export async function load({ url, params }) {
	const { search } = url;
	const isApplicant = extractQueryParam(search, 'applicant');
	const polymorphicId = extractQueryParam(search, 'polymorphicId');
	const status = extractQueryParam(url.search, 'status') as DocumentStatus;
	const { staffId } = params;
	const k = actionsButtons.map((x) => {
		if (x.path) {
			const paths = url.pathname.split('/');
			const r = url.pathname.split('/').length;
			const y = r === 4 ? `/${paths[1]}/${paths[2]}${x.path}` : `${url.pathname}${x.path}`;
			return {
				...x,
				path: isApplicant
					? `${y}?applicant=${isApplicant}&polymorphicId=${polymorphicId}&status=${status}`
					: y
			};
		} else {
			return x;
		}
	});
	let staffHeaderData = {} as IStaffHeader;
	let documentStaus: DocumentStatus = 'PENDING';
	let staff = {} as IStaffByID;
	if (isApplicant === 'true' && !isStaffNumber(staffId)) {
		const ret = await readRequest(staffId);
		// console.log(ret);
		if (ret.success) {
			const data = ret.data;
			documentStaus =
				data.applicationStatus !== 'PENDING' && data.applicationStatus !== 'APPROVED'
					? data.applicationStatus
					: status;
			staffHeaderData = {
				passportPicture: data.bioData.passportPicture,
				fullName: `${data.bioData.title} ${data.bioData.firstName} ${data.bioData.surName} ${data.bioData.otherNames ?? ''}`,
				status: 'APPLICANT',
				staffId: '-',
				directorate: '-',
				department: '-',
				unit: '-',
				email: data.email,
				phone: `0${data.contact}`
			};
		}
	} else {
		documentStaus = status;
		const ret = await readStaffById(staffId);
		if (ret.success) {
			const data = ret.data as IStaffByID;
			staffHeaderData = {
				passportPicture: data.passportPicture || '',
				fullName: `${data.title} ${data.firstName} ${data.lastName} ${data.otherNames ?? ''}`,
				status: `${data.status}`,
				staffId: data.staffIdentificationNumber || '-',
				directorate: data.directorate?.directorateName || '-',
				department: data.department?.departmentName || '-',
				unit: data.unit?.unitName || '-',
				email: data.email || '-',
				phone: data.phone || '-'
			};
			staff = data;
		}
	}

	return {
		pages: getRecordsActions(k, isApplicant === 'true' ? true : false, documentStaus),
		staffHeaderData,
		staff: staff
	};
}
