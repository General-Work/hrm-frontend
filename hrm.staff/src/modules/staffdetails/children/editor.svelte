<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { GENDERLIST } from '$lib/constants';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import axios from 'axios';
	import dayjs from 'dayjs';
	import { createEventDispatcher } from 'svelte';
	import * as z from 'zod';
	const schema = z.object({
		childName: z.string().min(1, 'Required'),
		dateOfBirth: z.string().min(1, 'Required'),
		gender: z.string().min(1, 'Required')
	});

	let busy = false;
	const dispatch = createEventDispatcher();
	let init = {
		childName: '',
		dateOfBirth: null,
		gender: ''
	};

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			const ret = await axios.post('/profile/children', {
				...values,
				dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : ''
			});
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			showInfo('Successfully updated children details');
			dispatch('close');
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
			endProgress();
		}
	}
</script>

<Form initialValues={init} class="p-4 space-y-4" {schema} on:submit={handleSubmit}>
	<TextField label="Full name of child" name="childName" required />
	<DateField label="Date of Birth" name="dateOfBirth" required maxDate={dayjs().toDate()} />
	<SelectField label="Gender" name="gender" required labelAsValue options={GENDERLIST} />
	<div class="flex justify-end gap-2 md:pb-8 pt-3">
		<Button label="Reset" type="reset" />
		<Button label="Submit" type="submit" color="primary" {busy} />
	</div>
</Form>
