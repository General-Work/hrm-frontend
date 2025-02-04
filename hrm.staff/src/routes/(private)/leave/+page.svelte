<script>
	import { activePage } from '$data/appStore';
	import { Alert } from 'flowbite-svelte';

	$activePage = {
		title: 'Leave Overview',
		showBreadCrumb: false
	};
</script>

<div class="flex justify-center items-center h-full">
	<!-- <Alert class="text-lg p-6">Leave Overview not available. Contact your System Administrator</Alert> -->
	 <ul>
		<li>Awaiting api to give leave related analytics to show to staff</li>
	 </ul>
</div>
