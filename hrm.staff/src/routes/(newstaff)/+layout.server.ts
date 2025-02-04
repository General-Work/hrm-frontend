import type { IApplicantInfo } from '$lib/types';
import { readLoginsDetails } from '$svc/applicant.js';
import { APPLICANT_LOGIN_KEY } from '$svc/auth';

export const load = async ({ cookies }) => {
	let user: IApplicantInfo | null = null;
	const applicantCookie = cookies.get(APPLICANT_LOGIN_KEY);
	if (applicantCookie) {
		try {
			const ret = await readLoginsDetails();
			if (ret.success)
				user = {
					id: ret.data.id,
					createdAt: ret.data.createdAt,
					updatedAt: ret.data.updatedAt,
					firsName: ret.data.firsName,
					lastName: ret.data.lastName,
					email: ret.data.email,
					contact: ret.data.contact,
					applicationStatus: ret.data.applicationStatus,
					hasSubmittedApplication: ret.data.hasSubmittedApplication
				};
		} catch (e) {}
	}
	return {
		isAuthencticated: user && user.id ? true : false,
		user: user
	};
};
