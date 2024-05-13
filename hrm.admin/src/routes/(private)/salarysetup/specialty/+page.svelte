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

<Box bgWhite otherClasses="p-4" rounded>
	<Specialty tableDataInfo={data.data} category={data.optional.category} /></Box
>
