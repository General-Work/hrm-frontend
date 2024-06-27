import { readDirectorates, type IDirectorate } from '$svc/setup';

export async function load({ cookies, url }: any) {
	let directorates: any[] = [];
	try {
		const ret = await readDirectorates();
		if (ret.success)
			directorates = ret.data.map((x: IDirectorate) => ({ id: x.id, label: x.directorateName }));
	} catch (error) {}
	return {
		directorates
	};
}
