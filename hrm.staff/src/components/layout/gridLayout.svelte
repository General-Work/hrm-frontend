<script lang="ts">
	import RightPanel from '$modules/staffdetails/partials/rightPanel.svelte';
	import { hideRightDrawer } from '$data/appStore';
	import type { IButtonConfig } from '$cmps/ui/cardButton.svelte';

	export let showActionLabel = true;
	export let buttons: IButtonConfig[] = [];
</script>

<div class=" w-full h-full flex gap-4 overflow-hidden pb-32 lg:pb-0">
	<section class=" flex-grow flex flex-col gap-2 h-full">
		<slot />
	</section>
	<div class="h-full bg-gray-200 w-0.5 pb-10 hidden md:block" />
	<aside class="hidden w-[21rem] shrink-0" class:md:block={$hideRightDrawer}>
		<RightPanel {showActionLabel} {buttons} />
	</aside>
</div>
