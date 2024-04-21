<script lang="ts">
	import ControlField from '$cmps/forms/controlField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import * as z from 'zod';

	export let isValid = false;
	let init = {
		dayCount: '',
		exhaustedAnnualLeave: '',
		maximumDays: null,
		hasSpecialCase: '',
		additionalDays: null
	};

	const schema = z.object({});

	function handleChange({ detail }: any) {
		const { values } = detail;
		init = values;
	}
</script>

<Form {schema} initialValues={init} class="space-y-4 p-4" on:change={handleChange}>
	<TextField label="Leave name" name="name" required />
	<div>
		<span class=" font-thin"
			>Days Count:
			<span class="text-red-500 pl-1">*</span>
		</span>
		<div class="space-y-2 pt-2">
			<ControlField label="Business Days" name="dayCount" value="Business Days" type="radio" />
			<ControlField label="All Days" name="dayCount" type="radio" value="All Days" />
		</div>
	</div>
	<div>
		<span class=" font-thin"
			>Must have exhausted annual leave to apply?
			<span class="text-red-500 pl-1">*</span>
		</span>
		<div class="space-y-2 pt-2">
			<ControlField label="YES" name="exhaustedAnnualLeave" type="radio" value="YES" />
			<ControlField label="NO" name="exhaustedAnnualLeave" type="radio" value="NO" />
		</div>
	</div>
	<TextField label="Maximum number of days" type="number" name="maximumDays" required />
	<div>
		<span class=" font-thin"
			>Can leave have a special case?:
			<span class="text-red-500 pl-1">*</span>
		</span>
		<div class="space-y-2 pt-2">
			<ControlField label="YES" name="hasSpecialCase" type="radio" value="YES" />
			<ControlField label="NO" name="hasSpecialCase" type="radio" value="NO" />
		</div>
	</div>
	<div class:hidden={!(init.hasSpecialCase === 'YES')}>
		<TextField label="Maximum number of days" type="number" name="maximumDays" required />
	</div>
</Form>
