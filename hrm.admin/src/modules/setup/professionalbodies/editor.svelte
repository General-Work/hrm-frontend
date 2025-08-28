<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import { type IProfessionalBody } from '$svc/setup';
	import * as z from 'zod';

	export let isValid = false;
	export let data: IProfessionalBody;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;
	let formData = { name: data.name || '' };
	// let renderId = 0;
	const schema = z.object({
		name: z.string().min(1, 'Name is required')
	});
	function handleChange({ detail }: any) {
		const { form } = detail;

		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}
</script>

<Form
	class="p-4"
	{schema}
	initialValues={formData}
	on:change={handleChange}
	on:submit
	bind:this={form}
>
	<TextField label="Name" name="name" required />
</Form>
