<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { key } from './form';
	import { nanoid } from 'nanoid';

	export let name = '';
	export let label = name;
	export let required = false;
	export let value = '';
	export let readonly = false;
	// export let placeholder = ""
	// export let showRequiredIndicator = true;
	// export let otherClasses = '';
	export let type: 'radio' | 'checkbox';

	let id = nanoid();
	let dispatch = createEventDispatcher();

	const { touched, errors, data }: any = getContext(key);

	function onChange() {
		dispatch('change', { name, value: $data[name] });
	}

	$: hasError = $touched[name] && $errors[name]?.length;
	$: error = $errors[name]?.join(', ');
</script>

<fieldset class="flex flex-col gap-1.5">
	<div class="flex items-center gap-2">
		<input {type} class="  border-gray-300" {name} {id} on:change={onChange} {value} disabled={readonly} />
		<label for={id} class="  font-medium">
			{label}
			{#if required}
				<span class="text-red-500 pl-1">*</span>
			{/if}
		</label>
	</div>
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
