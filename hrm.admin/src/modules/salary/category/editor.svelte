<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import type { ICategory } from '$svc/salaries';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let isValid = false;
	export let data: ICategory;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;
	let formData = { categoryName: data.categoryName || '' };
	const schema = z.object({
		categoryName: z.string().min(1, 'Name is required')
	});
	function handleChange({ detail }: any) {
		const { form } = detail;
		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}
</script>

<Form
	{schema}
	initialValues={formData}
	class="p-4"
	on:submit
	on:change={handleChange}
	bind:this={form}
>
	<TextField
		name="categoryName"
		label="Name of category"
		required
		placeholder="Enter name of category"
	/>
</Form>
