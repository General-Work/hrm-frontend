<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import { onMount } from 'svelte';
	import * as z from 'zod';
	import Button from './button.svelte';
	export let requestTypes: any[] = [];
	export let currentRequest: any = {};

	const schema = z.object({});
	let formData = {
		requestType: ''
	};

	$: if (currentRequest) {
		formData = { ...formData, requestType: currentRequest.title };
	}
</script>

<Form class="w-full" {schema} initialValues={formData}>
	<fieldset class="border-green-200 border bg-green-50 rounded-[5px] px-4 py-1.5">
		<legend class=" bg-green-100 text-green-500 tracking-wide px-2 text-sm border rounded-[5px]"
			>Filters</legend
		>
		<div class="flex flex-col lg:flex-row gap-2">
			<div class=" flex-grow max-w-4xl">
				<div class="grid grid-col-1 lg:grid-cols-3 gap-3">
					<SelectField
						options={requestTypes}
						placeholder="Request Types"
						labelAsValue
						name="requestType"
					/>
					<DateField placeholder="Start Date" name="startDate" />
					<DateField placeholder="End Date" name="endDate" />
				</div>
			</div>
			<Button
				label="Reset"
				otherClasses="py-1.5 lg:py-0 bg-blue-100 border-blue-300 hover:bg-blue-200 lg:ml-2"
				type="reset"
			/>
		</div>
	</fieldset>
</Form>
