import { readStaffProfile, type IStaffProfile } from '$svc/staffdetails';

export const load = async () => {
	let data = {} as IStaffProfile;
	// try {
	// 	const ret = await readStaffProfile();
	// 	if (ret.success) {
	// 		data = ret.data;
	// 	}
	// } catch (error) {}

	return {
		profile: data
	};
};
