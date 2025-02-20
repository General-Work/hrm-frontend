<script lang="ts">
	import { slide } from 'svelte/transition';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import TimeLine from '$cmps/ui/timeLine.svelte';
	import { onMount } from 'svelte';
	import { showError } from '$lib/utils';
	import { readRequestFeeds } from '$svc/staffrequests';
	export let feeds: any[] = [];
	export let documentId = '';
	let busy = true;

	onMount(async () => {
		try {
			const ret = await readRequestFeeds(documentId);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			feeds = ret.data;
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			busy = false;
		}
	});
</script>

{#if busy}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:else}
	<div class="pl-2 h-full" in:slide>
		<TimeLine activities={feeds} />
	</div>
{/if}
