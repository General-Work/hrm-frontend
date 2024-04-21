<script>
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import * as z from 'zod';

	const schema = z.object({});
</script>

<Form {schema} class="p-4 space-y-4">
	<SelectField label="Directorate" name="directorate" required />
	<SelectField label="Department" name="department" required />
	<TextField label="Unit Name" name="name" required />
	<SelectField label="Unit Head" name="hod" required />
</Form>
