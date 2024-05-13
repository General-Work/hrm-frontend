<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import * as z from 'zod';
	import { onMount } from 'svelte';
	import { showError } from '$lib/utils';
	import type { IOkResult } from '$svc/shared';
	import type { ICategory } from '$svc/salaries';
	import type { ISpecialty } from '$svc/salaries/specialty';

	export let isValid = false;
	export let optionalData: any;
	export let data: ISpecialty;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;
	let category: any[] = [];
	let formData = { name: '', category: '' };
	let renderId = 0;
	const schema = z.object({
		name: z.string().min(1, 'Name is required'),
		category: z
			.string({ invalid_type_error: 'Category is required' })
			.min(1, 'Category is required')
	});
	function handleChange({ detail }: any) {
		const { form } = detail;
		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}

	onMount(async () => {
		if (optionalData.category) {
			try {
				const ret: IOkResult<any> = await optionalData.category;
				if (!ret.success) {
					showError(ret.message);
					return;
				}
				category = ret.data.map((x: ICategory) => ({ id: x.id, category: x.categoryName }));
			} catch (error: any) {
				showError(error);
			}
		}
		if (data.id) {
			formData = { name: data.specialityName, category: data.categoryId };
			renderId++;
		}
	});
</script>

{#key renderId}
	<Form
		{schema}
		initialValues={formData}
		class="p-4 space-y-5"
		on:submit
		on:change={handleChange}
		bind:this={form}
	>
		<SelectField
			name="category"
			label="Category"
			required
			placeholder="Select category"
			options={category}
		/>
		<TextField
			name="name"
			label="Name of specialty"
			required
			placeholder="Enter name of specialty"
		/>
	</Form>
{/key}
