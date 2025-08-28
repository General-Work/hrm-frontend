<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import * as z from 'zod';
	import { onMount } from 'svelte';
	import { showError } from '$lib/utils';
	import { readCategories, type ICategory } from '$svc/salaries';
	import type { ISpecialty } from '$svc/salaries/specialty';
	import PageLoader from '$cmps/ui/pageLoader.svelte';

	export let isValid = false;
	export let data: ISpecialty;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;
	let category: any[] = [];
	let formData = { name: data.specialityName || '', category: data.category?.id || '' };
	let busy = true;
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
		try {
			const ret = await readCategories();
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			category = ret.data.map((a: ICategory) => ({
				value: a.id,
				label: a.categoryName
			}));
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			busy = false;
		}
	});
</script>

{#if busy}
	<div class="w-full h-full"><PageLoader size={50} /></div>
{:else}
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
{/if}
