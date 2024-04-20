<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import { showError, showInfo } from '$lib/utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import * as z from 'zod';

	export let requestId: number;
	let busy = false;
	let isLoading = true;
	let prevAssignedTo: number | null = 0;
	let staffList: any[] = [];
	let formData = {
		assignedTo: null,
	};

	const dispatch = createEventDispatcher();

	const schema = z.object({
		assignedTo: z.union([z.number(), z.null()])
	});

	async function handleSubmit({ detail }: any) {
		// try {
		// 	busy = true;
		// 	const { values } = detail;
		// 	const res = await transferDocument(documentId, values.assignedTo);
		// 	if (res.success) {
		// 		showInfo(res.message);
		// 		dispatch('close', 'refresh');
		// 	} else {
		// 		showError(res.message);
		// 	}
		// } catch (err: any) {
		// 	showError(err.message);
		// } finally {
		// 	busy = false;
		// }
	}

	function handleChange({ detail }: any) {
		// const { formValues } = detail;
		// formData = formValues;
	}
</script>

<div class="h-96">
	<Form
		{schema}
		initialValues={formData}
		class="flex flex-col gap-4 h-full"
		on:submit={handleSubmit}
		on:change={handleChange}
	>
		<div class="flex-grow">
			<SelectField
				label="Staff"
				name="assignedTo"
				required
				placeholder="Select a staff to transfer request"
				options={staffList}
			/>
		</div>
		<!-- {#if !formData.assignedTo && prevAssignedTo}
			<div class="pt-4" transition:scale>
				<RadioInput
					type="checkbox"
					name="agree"
					label="I understand that the system will reassign to the next staff if auto assignment is enabled."
				/>
			</div>
		{/if} -->
		<div class="grid pt-4">
			<Button
				label="Submit"
				color="primary"
				{busy}
				disabled={prevAssignedTo === formData.assignedTo}
			/>
		</div>
	</Form>
</div>
