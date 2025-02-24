<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import { z } from 'zod';

	export let data: any = {};
	export let isValid = false;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;

	let formData = { name: data.name || '' };

	const schema = z.object({
		name: z.string().min(1, 'Required')
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
	bind:this={form}
	on:change={handleChange}
>
	<TextField label="Name of promtion" name="name" required />
</Form>
