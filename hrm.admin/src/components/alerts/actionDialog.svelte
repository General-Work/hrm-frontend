<script lang="ts">
	import type { IModalSize } from '$cmps/ui/modal.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	export let open = false;
	export let text = '';
	export let title = '';
	export let acceptText = 'I accept';
	export let declineText = 'Decline';
	export let size: IModalSize = 'sm';
	export let busy = false;
	const dispatch = createEventDispatcher();
	let color: 'red' | 'green' | 'blue' | 'yellow' | 'primary' = 'primary';
</script>

<Modal
	{title}
	{open}
	{color}
	{size}
	on:close={() => dispatch('close')}
	backdropClass="fixed inset-0 z-[1000] bg-gray-900 bg-opacity-30 dark:bg-opacity-80"
	dialogClass="fixed top-0 start-0 end-0 h-modal md:inset-0 md:h-full z-[1100] w-full p-4 flex"
>
	<div class="text-base leading-relaxed">
		{text}
	</div>
	<svelte:fragment slot="footer">
		<Button disabled={busy} on:click={() => dispatch('accept')} color={busy ? 'none' : color}>
			<div class="flex items-center gap-1">
				{acceptText}
				{#if busy}
					<iconify-icon icon="svg-spinners:180-ring-with-bg" class="text-pink-600" />
				{/if}
			</div>
		</Button>
		<Button disabled={busy} color="alternative" on:click={() => dispatch('close')}
			>{declineText}</Button
		>
	</svelte:fragment>
</Modal>
