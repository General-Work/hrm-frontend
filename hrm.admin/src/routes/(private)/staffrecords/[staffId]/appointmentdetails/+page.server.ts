import { readGrades, type IGrade } from '$svc/salaries';

export async function load({ cookies, url }: any) {
	let grades: any[] = [];
	try {
		const ret = await readGrades();
		if (ret.success) grades = ret.data.map((x: IGrade) => ({ id: x.id, label: x.gradeName }));
	} catch (error) {}
	return {
		grades
	};
}
