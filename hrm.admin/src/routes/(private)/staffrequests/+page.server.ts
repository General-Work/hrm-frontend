const documentKinds = {
	all: {
		icon: 'ph:files',
		title: 'All Requests',
		path: 'all',
		iconBg: 'bg-green-200'
	},
	registration: {
		icon: 'solar:money-bag-bold',
		title: 'Staff Registration',
		path: 'registration',
		iconBg: 'bg-blue-200'
	},
	biodata: {
		icon: 'solar:money-bag-bold',
		title: 'Staff Biodata',
		path: 'biodata',
		iconBg: 'bg-blue-200'
	},
	bank: {
		icon: 'solar:money-bag-bold',
		title: 'Staff Bank Details',
		path: 'bank',
		iconBg: 'bg-blue-200'
	},
	family: {
		icon: 'solar:money-bag-bold',
		title: 'Staff Family Details',
		path: 'family',
		iconBg: 'bg-blue-200'
	},
	children: {
		icon: 'solar:money-bag-bold',
		title: 'Staff Children Details',
		path: 'children',
		iconBg: 'bg-blue-200'
	},
	licence: {
		icon: 'solar:money-bag-bold',
		title: 'Staff Professional Licence',
		path: 'licence',
		iconBg: 'bg-blue-200'
	},
	accomodation: {
		icon: 'solar:money-bag-bold',
		title: 'Staff Accomodation',
		path: 'accomodation',
		iconBg: 'bg-blue-200'
	}
	// leave_request: {
	// 	icon: 'solar:money-bag-bold',
	// 	title: 'Leave Request',
	// 	path: 'leave_request',
	// 	iconBg: 'bg-blue-200'
	// }
};

export async function load() {
	return {
		documentKinds
	};
}
