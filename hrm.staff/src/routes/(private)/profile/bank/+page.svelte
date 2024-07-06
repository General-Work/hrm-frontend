<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Bank from '$modules/staffdetails/bank/index.svelte';
	$activePage = {
		title: 'Bank Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Profile', path: '/profile' },
			{ title: 'Bank Details', path: '/staffdetails/bank' }
		],
		true
	);
</script>

<Bank />
