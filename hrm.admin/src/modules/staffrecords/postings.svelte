<script>
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import * as z from 'zod';

	const schema = z.object({});
</script>

<Form {schema} class="space-y-6">
	<SelectField label="Directorate" name="directorate" required />
	<SelectField label="Department" name="department" required />
	<SelectField label="Unit" name="unit" required />
	<DateField label="Posting date" name="postingDate" />
	<div class="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
		<Button label="Reset" type="reset" />
		<Button label="Submit" type="submit" color="success" />
	</div>
</Form>
