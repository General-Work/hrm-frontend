<script lang="ts" context="module">
	export interface IPersonalAttachments {}
</script>

<script lang="ts">
	import FileUpload from '$cmps/forms/fileUpload.svelte';
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import * as z from 'zod';
	export let data = {};
	let busy = false;
	let isValid = false;
	const schema = z.object({});
</script>

<Form {schema} initialValues={data}>
	<TextField label="Highest Education Level" />
	<TextField label="Highest Education Level" />
	<FileUpload label="Certificate" />
	<FileUpload label="Birth Certificate" />
	<slot {isValid} {busy} />
</Form>
