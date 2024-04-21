<script>
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import * as z from 'zod';

	const schema = z.object({});
</script>

<Form {schema} class="p-4 space-y-4">
	<SelectField label="Directorate" name="directorate" required />
	<TextField label="Department Name" name="name" required />
	<SelectField label="HOD" name="hod" required />
	<SelectField label="Deputy HOD" name="deputyHod" />
</Form>
