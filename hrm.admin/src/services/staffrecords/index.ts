import type { IItem } from '$cmps/layout/memberSearchBox.svelte';

export function readStaffWithStaffID(
	staffId: string
): Promise<{ success: boolean; message: string; items: IItem[] }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: '',
				items: [
					{
						label: 'Kwakye Sampson',
						subLabel: staffId,
						avatarUrl:
							'https://t3.ftcdn.net/jpg/03/73/52/24/360_F_373522464_UzkM3IvqgqpS0qIy2kpkB5QiV7Bw7NyS.jpg',
						avatarText: 'avaterText'
					}
				]
			});
		},500);
	});
}
