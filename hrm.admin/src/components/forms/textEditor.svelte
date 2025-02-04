<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getContext, createEventDispatcher, onMount } from 'svelte';
	import { nanoid } from 'nanoid';
	import { key } from './form';
	import Editor from 'cl-editor/src/Editor.svelte';

	let editor;
	// export let html = '';

	export let label = '';
	export let name = '';
	export let required = false;
	export let value = '';
	export let renderId = 0;
	// export let placeholder = '';
	// export let readonly = false;

	const { touched, errors, data, setData }: any = getContext(key);
	let id = nanoid();
	let dispatch = createEventDispatcher();
	onMount(() => {
		if (value) {
			renderId++;
			setData({ ...$data, [name]: value });
			dispatch('change', { name, value: value });
		} else {
			renderId++;
			setData({ ...$data, [name]: value });
			dispatch('change', { name, value: value });
		}
	});

	function onChange(evt: any) {
		const { detail } = evt;
		setData({ ...$data, [name]: detail });
		dispatch('change', { name, value: detail });
	}

	$: hasError = $touched[name] && $errors[name]?.length;
	$: error = $errors[name]?.join(', ');
	$: editorValue = $data[name] || value || '';
</script>

<fieldset class="flex flex-col gap-1.5">
	<label for={id} class="  font-medium text-gray-400 dark:text-white">
		{label}
		{#if required}
			<span class="text-red-500 pl-1">*</span>
		{/if}
	</label>

	{#key renderId}
		<Editor contentId={id} bind:this={editor} on:change={onChange} bind:html={editorValue} />
	{/key}

	{#if hasError}
		<label
			for={id}
			transition:fade
			class="flex items-center gap-1 pt-1 text-sm"
			class:text-red-600={hasError}
		>
			<iconify-icon icon="solar:danger-circle-bold-duotone" />
			{error}
		</label>
	{/if}
</fieldset>

<style>
	.error {
		@apply border-red-600;
	}
	.success {
		@apply border-green-600;
	}
	.readonly {
		@apply bg-[#f1f1f1];
	}
</style>
