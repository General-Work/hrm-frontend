<script>
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import * as z from 'zod';
	export let selectedDate = '';

	let init = { name: '', startDate: null, endDate: null };
	$: if (selectedDate) {
		// @ts-ignore
		init = { ...init, startDate: selectedDate } ;
	}
	const schema = z.object({});
</script>

<Form {schema} initialValues={init} class="p-4 space-y-6">
	<TextField label="Name of event" name="name" required />
	<DateField label="Start Date" name="startDate" required />
	<DateField label="End Date" name="endDate" required />
</Form>
