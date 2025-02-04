<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import type { IDirectorate } from '$svc/setup';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let isValid = false;
	export let data: IDirectorate;
	export const submit = () => {
		form.submit();
		return true;
	};
	let renderId = 0;
	let initialValues = {
		directorateName: '',
		directorId: '',
		depDirectoryId: ''
	};

	let form: any;
	const schema = z.object({
		directorateName: z.string().min(1, 'Directorate Name is required'),
		directorId: z.string().optional(),
		depDirectoryId: z.string().optional()
	});

	function handleChange({ detail }: any) {
		const { form } = detail;

		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}

	onMount(() => {
		if (data) {
			initialValues = {
				directorateName: data.directorateName,
				directorId: data.directorId || '',
				depDirectoryId: data.depDirectoryId || ''
			};
			renderId++;
		}
	});
</script>

{#key renderId}
	<Form
		bind:this={form}
		{schema}
		{initialValues}
		on:change={handleChange}
		on:submit
		class="p-4 space-y-4"
	>
		<TextField label="Directorate Name" name="directorateName" required />
		<SelectField label="Director" name="directorId" />
		<SelectField label="Deputy director" name="depDirectoryId" />
	</Form>
{/key}
