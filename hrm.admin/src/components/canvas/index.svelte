<script lang="ts">
	import type { IComponentDescriptor } from './types';
	import ComponentRenderer from './ComponentRenderer.svelte';
	// import { Alert } from "flowbite-svelte"
	import { ulid } from 'ulid';
	import { afterUpdate, beforeUpdate } from 'svelte';
	import { receive, send } from '$lib/utils';

	export let children: IComponentDescriptor[];

	$: toRender = children.map((x) => {
		if (!x.id) x.id = ulid();
		return x;
	});

	export let scrollingDiv: HTMLElement = {} as HTMLElement;
	let autoScroll = true;
</script>

<div class="flex-grow flex flex-col gap-5" bind:this={scrollingDiv}>
	{#each toRender as child (child.id)}
		<div
			class="flex shadow p-3 bg-white"
			in:receive={{ key: child.id }}
			out:send={{ key: child.id }}
		>
			<ComponentRenderer
				descriptor={child}
				on:close
				on:toggleCollapse
				on:removeItem
				on:toggleUpdate
				on:reload
			/>
		</div>
	{/each}
	{#if toRender.length === 0}
		<!-- <Alert>
      It is lonely here
    </Alert> -->
	{/if}
</div>
