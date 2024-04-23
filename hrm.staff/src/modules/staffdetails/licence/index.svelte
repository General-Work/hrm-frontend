<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import * as z from 'zod';

	const schema = z.object({});
</script>

<Fieldset label="Professional Details" kind="pink" icon="gridicons:institution">
	<Form {schema} class="space-y-6">
		<SelectField
			label="Professional Body"
			placeholder="Select professional body"
			required
			name="professionalBody"
		/>
		<TextField label="PIN" name="pin" placeholder="Enter your PIN" required />
		<DateField label="Issue Date" placeholder="Select pin issue date" name="pinDate" required />
		<DateField
			label="Expiry Date"
			placeholder="Select pin expiry date"
			name="expiryDate"
			required
		/>
	</Form>
</Fieldset>
