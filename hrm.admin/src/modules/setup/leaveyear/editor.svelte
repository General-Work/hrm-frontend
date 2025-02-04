<script>
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import * as z from 'zod';

	const schema = z.object({});
</script>

<Form {schema} class="p-4">
	<TextField label="Year" name="year" required type="number"/>
</Form>
