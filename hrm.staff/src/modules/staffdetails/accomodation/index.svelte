<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import { ACCOMODATIONSOURCE, ACCOMODATIONTYPE } from '$lib/constants';
	import * as z from 'zod';

	const schema = z.object({});

	let init = {
		source: '',
		gpsAddress: '',
		type: '',
		flatNumber: '',
		allocationDate: ''
	};

	function handleChange({ detail }: any) {
		const { values } = detail;
		init = values;
	}
</script>

<Fieldset label="Accomodation Details" kind="pink">
	<Form {schema} class="space-y-6" on:change={handleChange}>
		<SelectField
			options={ACCOMODATIONSOURCE}
			label="Source"
			placeholder="Select accomodation source"
			name="source"
			required
			labelAsValue
		/>
		<TextField
			label="GPS Address"
			name="gpsAddress"
			required
			placeholder="Enter your GPS address"
		/>
		<SelectField
			options={ACCOMODATIONTYPE}
			placeholder="Select accomodation type"
			name="type"
			label="Accomodation Type"
			required
			labelAsValue
		/>
		<TextField label="Enter flat number" name="flatNumber" />
		<div class:hidden={!(init.source === 'OFFICIAL')}>
			<DateField
				label="Select allocation date"
				name="allocationDate"
				required={init.source === 'OFFICIAL'}
			/>
		</div>
	</Form>
</Fieldset>
