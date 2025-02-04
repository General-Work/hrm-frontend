import { readApplicantDetails, type ApplicantDetails } from '$svc/applicant';
import { APPLICANT_LOGIN_KEY } from '$svc/auth.js';

export const load = async ({ cookies }) => {
	let details: ApplicantDetails | null = null;
	const applicantCookie = cookies.get(APPLICANT_LOGIN_KEY);
	if (applicantCookie)
		try {
			const ret = await readApplicantDetails();
			if (ret.success) {
				details = ret.data;
			}
		} catch (error) {}
	return {
		details
	};
};
