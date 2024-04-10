<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { key } from './form';
	import Svelecte from 'svelecte';
	import _ from 'lodash';
	import { nanoid } from 'nanoid';

	export let name = '';
	export let label = name;
	// export let noLabel = false;
	export let required = false;
	export let readonly = false;
	export let placeholder = '';
	export let options: any[] = [];
	export let valueAsObject = false;
	export let creatable = false;
	export let multiple = false;
	export let searchable = true;
	export const updateSelection = onUpdateSelection;

	let id = nanoid();
	let el: any;

	const { touched, errors, data }: any = getContext(key);
	const { isArray } = _;

	let value = $data[name];
	let ready = false;

	$: hasError = $touched[name] && $errors[name]?.length;
	$: error = $errors[name]?.join(', ');

	// reset the value and make it stick
	$: if (el && options.length && !ready) {
		if (isArray(value)) {
			el.setSelection([]);
			setTimeout(() => el.setSelection([...value], true), 0);
		}
		ready = true;
	}

	function onUpdateSelection(selection: any) {
		$data[name] = selection;
	}
</script>

<fieldset class="flex flex-col gap-2">
	<label for={id} class="font-light text-gray-600 dark:text-white">
		{label}
		{#if required}
			<span class="text-red-500 pl-1">*</span>
		{/if}
	</label>
	<Svelecte
		bind:this={el}
		bind:value={$data[name]}
		{name}
		{options}
		{required}
		{creatable}
		{valueAsObject}
		{placeholder}
		inputId={id}
		{multiple}
		{searchable}
		disabled={readonly}
		on:change
		{...$$restProps}
		class=" h-[40px]"
	/>
	{#if hasError}
		<div transition:fade class="flex items-center gap-1 pt-1 text-sm" class:text-red-600={hasError}>
			<iconify-icon icon="solar:danger-circle-bold-duotone" />
			{error}
		</div>
	{/if}
</fieldset>
