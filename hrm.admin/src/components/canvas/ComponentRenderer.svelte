<script lang="ts" context="module">
	let mapper = (name: string) => null as ConstructorOfATypedSvelteComponent | null;

	export function setMapper(f: (name: string) => ConstructorOfATypedSvelteComponent | null) {
		mapper = f;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { IComponentDescriptor } from './types';
	// import { slide } from 'svelte/transition';

	export let descriptor: IComponentDescriptor;
  export let showTitle = true

	let component: ConstructorOfATypedSvelteComponent | null;
	let props: any;

	function decode(descriptor: IComponentDescriptor) {
		component = mapper(descriptor.type);
		props = descriptor.props || {};
	}
	$: decode(descriptor);

	const dispatch = createEventDispatcher();
</script>

{#if component}
	<div class="flex-grow">
		{#if descriptor.title && showTitle}
			<div class="border-b pb-1 border-dotted flex justify-between items-center">
				<h3 class="text-teal-500 font-bold">
					{descriptor.title || ''}
				</h3>
				<div class="flex items-center gap-2">
					<button
						on:click={(_) => dispatch('toggleCollapse', descriptor.id)}
						class="grid place-content-center hover:bg-gray-200 rounded-full p-1"
						class:hidden={!descriptor.collapsible}
					>
						<iconify-icon
							icon={descriptor.collapsed
								? 'iconamoon:arrow-down-2-duotone'
								: 'iconamoon:arrow-up-2-duotone'}
							style="font-size: 20px;"
						/>
					</button>
					<button
						on:click={e => dispatch("close", { id: descriptor.id, data: e.detail })}
						class="grid place-content-center hover:bg-red-200 hover:text-red-400 rounded-full p-1"
						class:hidden={!descriptor.closable}
					>
						<iconify-icon icon="ic:round-close" style="font-size: 20px;" />
					</button>
				</div>
			</div>
		{/if}
		<div class:hidden={descriptor.collapsed}>
			<svelte:component this={component} {...props} on:close={e => dispatch("close", { descriptor, data: e.detail })}/>
		</div>
	</div>
{:else}
	<div class="">No valid component found for {descriptor?.type}</div>
{/if}
