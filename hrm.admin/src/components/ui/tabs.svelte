<script lang="ts" context="module">
	export interface ITab {
		id: string;
		label: string;
		component: any;
		icon?: string;
		isClosable?: boolean;
		props?: any;
	}

	export interface IRemoveTab {
		tabId: string;
		meta?: any;
	}
</script>

<script lang="ts">
	export let tabs: ITab[] = [];
	export let activeTab = '';
	export let makeTabSticky = false;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function changeTab(id: string) {
		activeTab = id;
		dispatch('tabChange', { activeTab });
	}
</script>

<div class="flex flex-col w-full h-full relative">
	{#if tabs.length > 1}
		<div
			class="flex space-x-3 border-b-2 mb-4 flex-wrap"
			class:makeSticky={makeTabSticky}
			class:custom-container={makeTabSticky}
		>
			{#each tabs as tab}
				<button
					class="py-2 px-4 border-b-2 rounded-t-md"
					class:bg-primary-500={activeTab === tab.id}
					class:text-white={activeTab === tab.id}
					class:text-gray-600={activeTab !== tab.id}
					class:hover:bg-gray-100={activeTab !== tab.id}
					class:border-transparent={activeTab !== tab.id}
					class:border-white={activeTab === tab.id}
					on:click={() => changeTab(tab.id)}
				>
					<div class="flex items-center gap-2">
						<span class="text-sm">
							{tab.label}
						</span>
						<iconify-icon icon={tab.icon} style="font-size: 15px;" />
						<button
							class="grid border border-transparent"
							class:hover:border-primary-500={activeTab !== tab.id}
							class:hover:border-white={activeTab === tab.id}
							class:hidden={!tab.isClosable}
							on:click={(e) => {
								// if (tabs.length == 2) renderId++
								// removeItem(tab.id);
								dispatch('removeItem', { tabId: tab.id });
								e.stopPropagation();
							}}><iconify-icon icon="iconamoon:close-thin" style="font-size: 18px;" /></button
						>
					</div>
				</button>
			{/each}
		</div>
	{/if}

	<div class=" w-full h-full" class:pt-12={makeTabSticky}>
		{#each tabs as tab (tab.id)}
			<div class:hidden={activeTab !== tab.id} class="w-full h-full">
				<svelte:component this={tab.component} on:addTab on:addItem {...tab.props} on:removeItem />
			</div>
		{/each}
	</div>
</div>

<style>
	.makeSticky {
		@apply fixed backdrop-blur-lg top-36  w-full z-10;
	}
</style>
