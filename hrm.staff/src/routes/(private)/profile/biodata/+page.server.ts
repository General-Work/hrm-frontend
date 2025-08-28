// import { readFamilyDetails, type IFamilyDetails } from '$svc/staffdetails';

import { getBiodata, type IBiodata } from '$svc/staffdetails';

export const load = async () => {
	let data = {} as IBiodata;
	try {
		const ret = await getBiodata();
		if (ret.success) {
			// console.log(ret.data);
			data = {
				title: ret.data?.title ? ret.data.title.toUpperCase() : '',
				gpsAddress: ret.data?.gpsAddress,
				firstName: ret.data?.firstName,
				lastName: ret.data?.lastName,
				otherNames: ret.data?.otherNames,
				phone: ret.data?.phone,
				gender: ret.data?.gender,
				snnitNumber: ret.data?.snnitNumber,
				email: ret.data?.email,
				disability: ret.data?.disability,
				ecowasCardNumber: ret.data?.ecowasCardNumber,
				status: ret.data?.status
			};
		}
	} catch (error) {}

	return {
		biodate: data
	};
};
