<script lang="ts">
	import SetupsView from '$cmps/layout/setupsView.svelte';
	import { activePage } from '$data/appStore';

	export let data;

	$activePage = {
		title: 'Application Setup',
		showBreadCrumb: false
	};
</script>

<div class="h-full w-full pt-4 ">
	<SetupsView cards={data.pages} moreHeight={false} moreShadow allowCustomContainerClass />
</div>
