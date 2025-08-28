<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Department from '$modules/setup/departments/index.svelte';

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

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<Department />
	</Box>
</div>
