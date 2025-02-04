<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import type { IBank } from '$svc/setup';
	// import { onMount } from 'svelte';
	import * as z from 'zod';

	export let isValid = false;
	export let data: IBank;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;
	let formData = { bankName: data.bankName ||'' };
	// let renderId = 0;
	const schema = z.object({
		bankName: z.string().min(1, 'Bank Name is required')
	});
	function handleChange({ detail }: any) {
		const { form } = detail;

		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}
	// onMount(() => {
	// 	if (data.id) {
	// 		formData = { bankName: data.bankName };
	// 		renderId++;
	// 	}
	// });
</script>

<!-- {#key renderId} -->
	<Form
		{schema}
		initialValues={formData}
		on:change={handleChange}
		on:submit
		bind:this={form}
		class="p-4"
	>
		<TextField label="Bank" name="bankName" placeholder="Enter name of bank" required />
	</Form>
<!-- {/key} -->
