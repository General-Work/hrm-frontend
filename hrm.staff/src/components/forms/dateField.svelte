<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { key } from './form';
	import { nanoid } from 'nanoid';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';

	export let name = '';
	export let label = name;
	export let required = false;
	export let readonly = false;
	export let placeholder = '';
	export let enableTime = false;
	export let noCalendar = false;
	export let dateFormat = enableTime ? 'd-m-Y H:i' : 'd-M-Y';
	export let altFormat = enableTime ? 'd-m-Y H:i' : 'd-M-Y'; // enableTime ? "F j, Y" : "F j, Y H:i" // "Y-m-d H:i" //
	export let altInput = true;
	export let weekNumbers = false;
	export let mode: 'single' | 'multiple' | 'range' = 'single';

	let id = nanoid();
	let pickerId = nanoid();
	let fullPickerId = `#${pickerId}`;
	let dispatch = createEventDispatcher();

	const { touched, errors, data }: any = getContext(key);
	let formattedValue: any;

	const options = {
		mode,
		enableTime,
		noCalendar,
		dateFormat,
		altFormat,
		altInput,
		weekNumbers,
		element: fullPickerId,
		onChange(selectedDates: any, dateStr: any) {
			// console.log('changed', { name, selectedDates, dateStr });
		}
	};

	function handleChange(event: any) {
		const [selectedDates, dateStr] = event.detail;
		// console.log({ selectedDates, dateStr });
	}

	$: hasError = $touched[name] && $errors[name]?.length;
	$: error = $errors[name]?.join(', ');

	// todo: how to add additional classes
</script>

<fieldset class="flex flex-col gap-1.5">
	<label for={id} class=" font-light text-gray-600 dark:text-white">
		{label}
		{#if required}
			<span class="text-red-500 pl-1">*</span>
		{/if}
	</label>

	<Flatpickr
		{options}
		bind:value={$data[name]}
		bind:formattedValue
		on:change={handleChange}
		{placeholder}
		{name}
		{readonly}
		class="border border-gray-300 border-solid h-10 rounded-[5px] w-full"
	/>

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
