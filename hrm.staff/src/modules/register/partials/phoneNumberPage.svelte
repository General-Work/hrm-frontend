<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { validatePhoneNumber } from '$lib/utils';
	import * as z from 'zod';

	export let activeStep = 0;
	export let phoneNumber = '';

	let formData = {
		phoneNumber: ''
	};

	const handleSubmit = ({ detail }: any) => {
		const {values} = detail
		phoneNumber = values.phoneNumber;
		activeStep = 1;
	};

	const schema = z.object({
		phoneNumber: z.string().min(1, 'Phone Number is required').refine(validatePhoneNumber, {
			message: 'Invalid phone number format. Please enter a 10-digit phone number.'
		})
	});
</script>

<Form class="flex flex-col gap-8 px-12" initialValues={formData} on:submit={handleSubmit} {schema}>
	<p class="text-gray-500 text-sm items-center flex gap-1">
		<iconify-icon icon="solar:danger-circle-bold-duotone" class="text-red-600" />
		We will be sending you an One-Time Password (OTP) on your phone number.
	</p>
	<TextField
		placeholder="Enter your phone number"
		label="Phone Number"
		required
		name="phoneNumber"
	/>
	<Button label="Send OTP" color="darkBlue" type="submit" />
</Form>
