<script>
	import { activePage } from '$data/appStore';
	import { Alert } from 'flowbite-svelte';

	$activePage = {
		title: 'Overview',
		showBreadCrumb: false
	};
</script>

<div class="flex justify-center items-center h-full">
	<Alert class='text-lg p-6'>Overview of staff activties not available. Contact your System Administrator</Alert>
</div>
