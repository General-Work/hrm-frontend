<script lang="ts">
	import { isPdf } from '$lib/utils';
	import { slide } from 'svelte/transition';
	export let src = '';
	export let title = '';
	export let imageName = '';
	export let isAvatar = false;

	$: renderImageTag = !isPdf(src);

	function onItemClick(e: any) {
		e.target.requestFullscreen();
	}
	let frame: HTMLIFrameElement;
	function openFrame() {
		if (frame) frame.requestFullscreen();
	}
</script>

{#if renderImageTag}
	<div class="w-fullx xh-full flex flex-col gap-2">
		<span class="text-center text-gray-400 font-bold">{imageName}</span>
		<button class="group relative grid justify-center" on:click={onItemClick}>
			<img
				{src}
				alt="pic"
				class="w-fullx xh-64 bg-white transition duration-300 ease-in-out transform group-hover:scale-95"
			/>
			{#if isAvatar}
				<div
					class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"
					class:rounded-full={isAvatar}
				/>
			{/if}
		</button>
	</div>
{:else if renderImageTag && isPdf(src)}
	<div class="w-fullx xh-full flex flex-col gap-2">
		<span class="text-center text-gray-300 font-bold">{imageName}</span>
		<button class="group relative grid justify-center" on:click={onItemClick}>
			<iconify-icon icon="bxs:file" style="font-size: 30px;" />
			{#if isAvatar}
				<div
					class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"
					class:rounded-full={isAvatar}
				/>
			{/if}
		</button>
	</div>
{:else}
	<div class="w-full h-full flex flex-col" in:slide>
		<div class="flex mt-2" class:hidden={!imageName}>
			<span class="text-center text-gray-300 font-bold flex-grow">{imageName}</span>
			<iconify-icon
				icon="ph:arrows-out"
				class=""
				on:click={openFrame}
				on:keydown
				role="button"
				tabindex="-1"
			/>
		</div>
		<iframe {src} {title} class="flex-grow" bind:this={frame} />
	</div>
{/if}
