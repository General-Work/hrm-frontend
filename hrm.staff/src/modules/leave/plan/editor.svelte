<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import { generateEndDate } from '$lib/utils';
	import dayjs from 'dayjs';
	import * as z from 'zod';

	const schema = z.object({});
	let init = {
		planYear: '2024',
		noOfDays: null,
		startDate: null,
		endDate: null,
		department: null,
		unit: null,
		supervisor: null
	};
	let renderId = 0;
	const department = ['OPERATIONS'];
	const unit = ['IT'];
	const supervisor = ['Samuel Marfo'];

	function handleChange({ detail }: any) {
		const { values } = detail;
		const endDate = generateEndDate(values.startDate, values.noOfDays);
		endDate === 'Invalid Date'
			? (init = { ...values })
			: (init = { ...values, endDate: dayjs(endDate).format('DD-MMM-YYYY') });
	}
</script>

<Fieldset label="Plan Form" kind="pink" icon="game-icons:archive-register">
	{#key renderId}
		<Form {schema} class="flex flex-col gap-4 p-2" initialValues={init} on:change={handleChange}>
			<TextField readonly required name="planYear" label="Plan Year" />

			<TextField
				required
				name="noOfDays"
				label="No. of days"
				type="number"
				placeholder="Enter number of days planning"
			/>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<DateField
					required
					name="startDate"
					label="Start Date"
					placeholder="Select when you want your plan to begin"
				/>
				<TextField required name="endDate" label="End Date" readonly />
			</div>

			<SelectField
				required
				name="department"
				label="Department"
				placeholder="Select your current department"
				options={department}
			/>
			<SelectField
				required
				name="unit"
				label="Unit"
				placeholder="Select your current unit"
				options={unit}
			/>
			<SelectField
				required
				name="supervisor"
				label="Supervisor"
				placeholder="Select your supervisor"
				options={supervisor}
			/>
			<slot />
		</Form>
	{/key}
</Fieldset>
