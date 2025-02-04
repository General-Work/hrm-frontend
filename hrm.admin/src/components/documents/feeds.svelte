<script lang="ts">
	import { slide } from 'svelte/transition';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import TimeLine from '$cmps/ui/timeLine.svelte';
	export let feeds: any;
</script>

{#await feeds}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:then data}
	<div class="pl-2 h-full" in:slide>
		<TimeLine activities={data.data} />
	</div>
{/await}
