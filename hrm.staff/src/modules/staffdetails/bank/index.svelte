<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
	import { ACCOUNTTYPE } from '$lib/constants';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import {
		postBankDetails,
		readAllBanks,
		readBankDetails,
		type IBank,
		type IBankDetail
	} from '$svc/staffdetails';
	import { Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	let busy = false;
	let isLoading = true;
	let banks: any[] = [];
	const schema = z.object({
		bankId: z.string().min(1, 'Bank is required'),
		branch: z.string().min(1, 'Branch is required'),
		accountType: z.string().optional(),
		accountNumber: z.string().min(1, 'Account Number is required'),
		accountName: z.string().min(1, 'Account Name is required')
	});
	let formData = {
		bankId: '',
		branch: '',
		accountType: '',
		accountNumber: '',
		accountName: ''
	};
	let readonly = false;
	let renderId = 0;

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			// console.log(values)
			// const ret = await axios.post('/profile/bank', values);
			const ret = await postBankDetails(values);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo('Successfully updated bank details');
			await fetchData();
			renderId++;
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			endProgress();
			busy = false;
		}
	}

	async function fetchData() {
		try {
			const ret = await readBankDetails();
			// console.log({ ret });
			if (!ret.success) {
				if (ret.message === 'Bank details not found.') return;
				showError(ret.message);
				return;
			}
			readonly = ret.data.status == 'PENDING';
			formData = {
				bankId: ret.data.bankId,
				branch: ret.data.branch,
				accountType: ret.data.accountType,
				accountNumber: ret.data.accountNumber,
				accountName: ret.data.accountName
			};
		} catch (error: any) {
			showError(error?.message);
		}
	}

	onMount(async () => {
		try {
			const ret = await readAllBanks();
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			banks = ret.data.map((x: IBank) => ({ id: x.id, label: x.bankName }));
		} catch (error: any) {
			showError(error?.message || error);
		}
		await fetchData();
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:else}
	<SlideDown>
		<ScrollArea otherClasses="w-full h-full pt-3 px-1">
			<Fieldset label="Banking Info" icon="mdi:bank-outline" kind="pink">
				{#key renderId}
					<Form
						initialValues={formData}
						{schema}
						class="w-full h-full flex flex-col gap-6"
						on:submit={handleSubmit}
					>
						{#if readonly}
							<Alert color="blue">Your bank information is under review</Alert>
						{/if}
						<div class="grid gap-6">
							<SelectField label="Bank Name" required name="bankId" options={banks} {readonly} />
							<TextField label="Branch" required name="branch" {readonly} />
							<SelectField
								label="Account Type"
								name="accountType"
								options={ACCOUNTTYPE}
								labelAsValue
								{readonly}
							/>
							<TextField label="Account Name" required name="accountName" {readonly} />
							<TextField label="Account Number" required name="accountNumber" {readonly} />
						</div>
						<div class:hidden={readonly} class="flex justify-end gap-2 md:pb-8 pt-3">
							<Button label="Reset" type="reset" />
							<Button label="Submit" type="submit" color="primary" {busy} />
						</div>
					</Form>
				{/key}
			</Fieldset>
		</ScrollArea>
	</SlideDown>
{/if}
