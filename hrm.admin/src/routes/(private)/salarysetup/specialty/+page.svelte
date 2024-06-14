<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Specialty from '$modules/salary/specialty/index.svelte';

	export let data;

	$activePage = {
		title: 'Specialty',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/salarysetup' },
			{ title: 'Specialty', path: '/salarysetup/specialty' }
		],
		true
	);
</script>

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<Specialty tableDataInfo={data.data} category={data.optional.category} /></Box
	>
</div>
