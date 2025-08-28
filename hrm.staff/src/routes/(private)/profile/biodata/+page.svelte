<script lang="ts">
	import { activePage, breadCrumb } from '$data/appStore';
	import Biodata from '$modules/staffdetails/biodata/index.svelte';
	import type { IBiodata } from '$svc/staffdetails';
	export let data;
	$activePage = {
		title: 'Bio Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Profile', path: '/profile' },
			{ title: 'Bio Details', path: '/staffdetails/biodata' }
		],
		true
	);

	// $: console.log({ data });
</script>

<Biodata data={data.biodate} />
