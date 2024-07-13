import {
	readProfessionalBodies,
	readProfessionalLicence,
	type IProfessionalBody,
	type IProfessionalLicenceDetails
} from '$svc/staffdetails';

export const load = async () => {
	let data = {} as IProfessionalLicenceDetails;
	let bank = [] as any[];
	try {
		const [memberData, banks] = await Promise.all([
			readProfessionalLicence(),
			readProfessionalBodies()
		]);

		if (memberData.success) {
			data = memberData.data;
		}
		if (banks.success) {
			
			bank = banks.data.map((x: IProfessionalBody) => ({ id: x.id, label: x.name }));
		}
	} catch (error) {}

	return {
		professionalLicenceDetails: data,
		professionalBodies: bank
	};
};
