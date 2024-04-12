<script lang="ts">
	import { goto } from '$app/navigation';
	import ActionButton from '$cmps/ui/actionButton.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
	import type { IMenuItem } from '$lib/types';

	export let cards: IMenuItem[] = [];
	export let moreHeight = true;
</script>

<SlideDown otherClasses="w-full h-full">
	{#if cards && cards.length}
		<ScrollArea otherClasses="w-full h-full">
			<div class="flex flex-col gap-8">
				{#each cards as card}
					<div class="space-y-3">
						<div class="border-b border-gray-300 text-teal-500 text-lg">{card.title}</div>
						<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
							{#if card?.items && card.items.length}
								{#each card?.items as item (item.title)}
									<ActionButton
										label={item.title}
										subLabel={item.description}
										showArrow
										iconBgColor={item.iconBg}
										icon={item.icon}
										iconColor={item.iconColor}
										showIconHover={false}
										{moreHeight}
										iconSize={20}
										on:click={() => {
											goto(item.path ? item.path : '');
										}}
									/>
								{/each}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</ScrollArea>
	{/if}
</SlideDown>
