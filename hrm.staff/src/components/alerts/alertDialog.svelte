<script>
	import { Button, Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let message = '';
	export let icon = 'line-md:alert-circle';
	export let disableYes = false;
	export let busy = false;
	export let iconColor = '';
	export let confirmText = "Yes, I'm sure";

	const dispatch = createEventDispatcher();
</script>

<Modal
	bind:open
	size="xs"
	backdropClass="bg-opacity-30 fixed inset-0 z-40 bg-gray-900 dark:bg-opacity-80"
>
	<div class="text-center">
		<iconify-icon {icon} style="font-size: 100px;" class={iconColor} />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
		<Button disabled={disableYes || busy} color="red" class="mr-2" on:click={() => dispatch('yes')}
			><div class="flex items-center gap-1">
				{confirmText}
				{#if busy}
					<iconify-icon icon="svg-spinners:180-ring-with-bg" class="text-pink-600" />
				{/if}
			</div></Button
		>
		<Button color="alternative" on:click={() => dispatch('cancel')} disabled={busy}
			>No, cancel</Button
		>
	</div>
</Modal>
