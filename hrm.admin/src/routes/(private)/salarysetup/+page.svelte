<script lang="ts">
	import SetupsView from '$cmps/layout/setupsView.svelte';
	import { activePage } from '$data/appStore';

	export let data;

	$activePage = {
		title: 'Salary Setup',
		showBreadCrumb: false
	};
</script>

<div class="h-full w-full px-6 pb-6 pt-4">
	<SetupsView cards={data.pages} />
</div>
