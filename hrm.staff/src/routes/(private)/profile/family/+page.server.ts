import { readFamilyDetails, type IFamilyDetails } from '$svc/staffdetails';

export const load = async () => {
	let data = {} as IFamilyDetails;
	try {
		const ret = await readFamilyDetails();
		// console.log({ ret });
		if (ret.success) {
			// console.log(ret.data)
			data = ret.data;
		}
	} catch (error) {}

	return {
		familyDetails: data
	};
};
