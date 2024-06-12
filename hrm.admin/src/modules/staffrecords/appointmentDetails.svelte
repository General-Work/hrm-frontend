<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import Title from '$cmps/ui/title.svelte';
	import { APPOINTMENTTYPELIST, STAFFPAYMENTTYPE, STAFFTYPE } from '$lib/constants';

	import * as z from 'zod';

	const schema = z.object({});
	let openAlert = false;

	function handleSubmit({ detail }: any) {
		openAlert = true;
	}

	function handleCancel() {
		openAlert = false;
		// if (browser) window.history.back();
	}
	function handleYes() {
		goto(`/staffrecords/MS0001/postings`);
		openAlert = false;
	}
</script>

<Form {schema} class="flex flex-col gap-4" on:submit={handleSubmit}>
	<Fieldset label="Appointments" kind="blue" icon="mingcute:pencil-3-fill">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<SelectField label="Staff Type" name="type" options={STAFFTYPE} required />
			<SelectField
				label="Appointment Type"
				name="appointmentType"
				options={APPOINTMENTTYPELIST}
				required
			/>
			<SelectField label="Salary Source" name="fund" options={STAFFPAYMENTTYPE} required />
		</div>
		<div class="my-5">
			<Title label="First Appointment" />
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
				<DateField label="Notional Date" name="firstAppNotionalEffect" required />
				<DateField label="Substantive Date" name="firstAppSubstantiveEffect" required />
				<SelectField label="First Appointment Grade" required name="firstAppointmentGrade" />
			</div>
		</div>
		<div class="my-5">
			<Title label="Current Appointment" />
			<div class="space-y-4">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
					<DateField label="Notional Date" name="notionalEffect" required />
					<DateField label="Substantive Date" name="substantiveEffect" required />
				</div>
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<SelectField label="Current Grade" name="currentGrade" />
					<TextField label="Profession" name="profession" required />
					<SelectField label="Specialty" name="specialty" />
				</div>
			</div>
		</div>
	</Fieldset>
	<Fieldset label="Salary" icon="fluent:payment-32-filled">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
			<TextField label="Scale" name="scale" readOnly required />
			<TextField label="Band" name="band" readOnly required />
			<SelectField size="small" label="Step" name="step" required />
			<TextField label="Salary" name="salary" required readOnly/>
		</div>
		<!-- <div class="pt-4">
			<div class="border-b">Bank Details</div>
			<div class="grid grid-cols-1 gap-4 pt-2">
				<SelectField label="Name of bank" name="bank" required />
				<TextField label="Branch" name="branch" />
				<SelectField label="Account Type" name="accountType" options={ACCOUNTTYPE} />
				<TextField label="Account Number" name="accountNumber" required />
			</div>
		</div> -->
	</Fieldset>
	<div class="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
		<Button label="Reset" type="reset" />
		<Button label="Submit" type="submit" color="success" />
	</div>
</Form>

<AlertDialog
	open={openAlert}
	message="Do you want to continue with staff's Posting Details?"
	confirmText="Yes, I want"
	dismissable={false}
	on:yes={handleYes}
	on:cancel={handleCancel}
/>
