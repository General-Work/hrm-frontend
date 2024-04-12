<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import * as z from 'zod';

	export let isValid = false;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;

	let formData = { name: '', category: null };
	const schema = z.object({
		name: z.string().min(1, 'Name is required'),
		category: z.number({
			invalid_type_error: 'Category is required',
			required_error: 'Category is required'
		})
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
	class="p-4 space-y-5"
	on:submit
	on:change={handleChange}
	bind:this={form}
>
	<SelectField name="category" label="Category" required placeholder="Select category" />
	<TextField name="name" label="Name of specialty" required placeholder="Enter name of specialty" />
</Form>
