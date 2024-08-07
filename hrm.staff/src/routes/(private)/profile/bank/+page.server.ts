import { readAllBanks, readBankDetails, type IBank, type IBankDetail } from '$svc/staffdetails';

export const load = async () => {
	let data = {} as IBankDetail;
	let bank = [] as any[];
	try {
		const [memberData, banks] = await Promise.all([readBankDetails(), readAllBanks()]);
		if (memberData.success) {
      // console.log(memberData.data)
			data = memberData.data;
		}
		if (banks.success) {
			bank = banks.data.map((x: IBank) => ({ id: x.id, label: x.bankName }));
		}
	} catch (error) {}

	return {
		bankDetails: data,
		banks: bank
	};
};
