<script>
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import { GENDERLIST } from '$lib/constants';
	import * as z from 'zod';

	const schema = z.object({});
</script>

<Form class="p-4 space-y-4" {schema}>
	<TextField label="Full name of child" name="name" required />
	<DateField label="Date of Birth" name="dob" required />
	<SelectField label="Gender" name="gender" labelAsValue options={GENDERLIST} />
</Form>
