<script lang="ts">
	import { activePage } from '$data/appStore';
	import Demo from '$modules/dashboards/demo.svelte';

	$activePage = {
		title: 'Dashboard',
		showBreadCrumb: false
	};
</script>

<div class="w-full h-full custom-container">
	<Demo />
</div>
