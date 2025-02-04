import { readAccomodationDetail, type IAccomodationDetails } from '$svc/staffdetails';

export const load = async () => {
	let data = {} as IAccomodationDetails;
	try {
		const ret = await readAccomodationDetail();
		if (ret.success) {
			// console.log(ret.data);
			data = ret.data;
		}
	} catch (error) {}

	return {
		accomodatioDetail: data
	};
};
