<script>
	import BioData from '$modules/register/bioData.svelte';
	export let data;
</script>

<div class="w-screen h-svh">
	<BioData user={data.user} />
</div>
