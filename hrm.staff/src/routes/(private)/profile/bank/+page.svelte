<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Bank from '$modules/staffdetails/bank/index.svelte';
	export let data;
	$activePage = {
		title: 'Bank Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Profile', path: '/profile' },
			{ title: 'Bank Details', path: '' }
		],
		true
	);
</script>

<Bank data={data.bankDetails} banks={data.banks} />
