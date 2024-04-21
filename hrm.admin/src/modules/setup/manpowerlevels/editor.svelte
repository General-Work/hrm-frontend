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
	<SelectField label="Unit" name="unit" required />
	<SelectField label="Category" name="category" required />
	<SelectField label="Specialty" name="specialty" required />
	<TextField label="Established Norm" name="norm" required type="number" />
</Form>
