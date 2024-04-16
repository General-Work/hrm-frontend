<script lang="ts">
	import SetupsView from '$cmps/layout/setupsView.svelte';
	import type { IMenuItem } from '$types/types';

	export let cards: IMenuItem[];
</script>

<SetupsView {cards} />
