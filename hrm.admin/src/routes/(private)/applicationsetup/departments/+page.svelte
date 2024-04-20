<script>
	import { activePage, breadCrumb } from '$data/appStore';

	$activePage = {
		title: 'Departments',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Departments', path: '' }
		],
		true
	);
</script>
