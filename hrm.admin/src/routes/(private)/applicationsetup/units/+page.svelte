<script>
	import { activePage, breadCrumb } from '$data/appStore';

	$activePage = {
		title: 'Units',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Units', path: '' }
		],
		true
	);
</script>
