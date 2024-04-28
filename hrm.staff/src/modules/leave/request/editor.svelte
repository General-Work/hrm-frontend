<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import { DELIVERYTPES } from '$lib/constants';
	import { generateEndDate } from '$lib/utils';
	import dayjs from 'dayjs';
	import * as z from 'zod';

	const schema = z.object({});
	let init = {
		leaveYear: '2024',
		noOfDays: null,
		startDate: null,
		endDate: null,
		department: null,
		unit: null,
		supervisor: null,
		leaveType: ''
	};
	let renderId = 0;
	const department = ['OPERATIONS'];
	const unit = ['IT'];
	const supervisor = ['Samuel Marfo'];
	const leaveTypes = ['CASUAL LEAVE', 'ANNUAL LEAVE', 'MATERNITY LEAVE'];

	function handleChange({ detail }: any) {
		const { values } = detail;
		const endDate = generateEndDate(values.startDate, values.noOfDays);
		endDate === 'Invalid Date'
			? (init = { ...values })
			: (init = { ...values, endDate: dayjs(endDate).format('DD-MMM-YYYY') });
	}
	// $:console.log(init)
</script>

<Fieldset label="Leave Form" kind="pink" icon="game-icons:archive-register">
	{#key renderId}
		<Form {schema} class="flex flex-col gap-4 p-2" initialValues={init} on:change={handleChange}>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<TextField readonly required name="leaveYear" label="Leave Year" />
				<SelectField
					label="Leave Type"
					placeholder="Select a preferred leave"
					name="leaveType"
					options={leaveTypes}
					labelAsValue
					required
				/>
			</div>

			<TextField
				required
				name="noOfDays"
				label="No. of days"
				type="number"
				placeholder="Enter number of days requesting"
			/>
			<div
				class:hidden={!(init.leaveType === 'MATERNITY LEAVE')}
				class="grid grid-cols-1 lg:grid-cols-2 gap-4"
			>
				<SelectField
					label="Type of delivery"
					options={DELIVERYTPES}
					name="deliveryType"
					placeholder="Select delivery type"
					required
				/>
				<TextField label="No. of babies delivered" name="noOfBabies" required />
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<DateField
					required
					name="startDate"
					label="Proposed Start Date"
					placeholder="Select when you want your plan to begin"
				/>
				<TextField required name="endDate" label="Proposed End Date" readonly />
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<SelectField
					required
					name="supervisor"
					label="Supervisor"
					placeholder="Select your supervisor"
					options={supervisor}
				/>
				<TextField name="relievingOfficer" label="Relieving Officer" required />
			</div>

			<TextField name="altContact" label="Contact when away" required />

			<slot />
		</Form>
	{/key}
</Fieldset>
