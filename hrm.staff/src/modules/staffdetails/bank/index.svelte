<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
	import { ACCOUNTTYPE } from '$lib/constants';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import type { IBankDetail } from '$svc/staffdetails';
	import axios from 'axios';
	import * as z from 'zod';

	export let data: IBankDetail;
	export let banks: any[] = [];
	let busy = false;
	const schema = z.object({
		bankId: z.string().min(1, 'Bank is required'),
		branch: z.string().min(1, 'Branch is required'),
		accountType: z.string().optional(),
		accountNumber: z.string().min(1, 'Account Number is required'),
		accountName: z.string().min(1, 'Account Name is required')
	});
	let formData = {
		bankId: data.bankId || '',
		branch: data.branch || '',
		accountType: data.accountType || '',
		accountNumber: data.accountNumber || '',
		accountName: data.accountName || ''
	};

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			// console.log(values)
			const ret = await axios.post('/profile/bank', values);
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			showInfo('Successfully updated bank details');
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			endProgress();
			busy = false;
		}
	}
</script>

<SlideDown>
	<ScrollArea otherClasses="w-full h-full pt-3 px-1">
		<Fieldset label="Banking Info" icon="mdi:bank-outline" kind="pink">
			<Form
				initialValues={formData}
				{schema}
				class="w-full h-full flex flex-col gap-6"
				on:submit={handleSubmit}
			>
				<div class="grid gap-6">
					<SelectField label="Bank Name" required name="bankId" options={banks} />
					<TextField label="Branch" required name="branch" />
					<SelectField label="Account Type" name="accountType" options={ACCOUNTTYPE} labelAsValue />
					<TextField label="Account Name" required name="accountName" />
					<TextField label="Account Number" required name="accountNumber" />
				</div>
				<div class="flex justify-end gap-2 md:pb-8 pt-3">
					<Button label="Reset" type="reset" />
					<Button label="Submit" type="submit" color="primary" {busy} />
				</div>
			</Form>
		</Fieldset>
	</ScrollArea>
</SlideDown>
