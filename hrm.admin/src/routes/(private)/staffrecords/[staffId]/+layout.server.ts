import type { IButtonConfig } from '$cmps/ui/cardButton.svelte';

const actionsButtons: IButtonConfig[] = [
	{
		label: 'Appointment Details',
		kind: 'form',
		subLabel: '',
		path: '/appointmentdetails',
	
	},
	{
		label: 'Postings',
		kind: 'generic',
		subLabel: '',
		path: '/postings',
		icon: 'clarity:file-group-solid',
		// iconBgColor: 'bg-green-100',
		// iconColor: 'text-green-500'
	},
	// {
	// 	label: 'Excuse Duty',
	// 	kind: 'generic',
	// 	icon: 'iconoir:healthcare',
	// 	subLabel: 'Request for an excuse duty',
	// 	path: ''
	// }
];

export async function load({ url }) {
	const k = actionsButtons.map((x) => {
		if (x.path) {
			const paths = url.pathname.split('/');
			const r = url.pathname.split('/').length;
			const y = r === 4 ? `/${paths[1]}/${paths[2]}${x.path}` : `${url.pathname}${x.path}`;
			return {
				...x,
				path: y
			};
		} else {
			return x;
		}
	});
	return {
		pages: k
	};
}
