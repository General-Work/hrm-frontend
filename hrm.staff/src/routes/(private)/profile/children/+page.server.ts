import { readChildrenDetails, type IChildDetails } from '$svc/staffdetails';

export async function load() {
	let data: IChildDetails[] = [];
	try {
		const ret = await readChildrenDetails();
		if (ret.success) {
			data = ret.data;
		}
	} catch (error) {}
	return {
		children: data
	};
}
