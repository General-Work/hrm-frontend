<script>
	import { activePage } from '$data/appStore';
	import { Alert } from 'flowbite-svelte';

	$activePage = {
		title: 'Appraisal',
		showBreadCrumb: false
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	<Alert class="text-lg p-6">Module not available. Contact your System Administrator..</Alert>
</div>
