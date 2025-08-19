<script lang="ts" context="module">
	export interface IPostingFormDto {
		directorateId: string;
		departmentId: string;
		unitId: string;
		postingDate: null | string;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	// import { page } from '$app/stores';
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import { readDirectorates, type IDirectorate } from '$svc/setup';
	import { addPostingDetails, type PostingsDto } from '$svc/staffrequests';
	import axios from 'axios';
	import dayjs from 'dayjs';
	import { createEventDispatcher, onMount } from 'svelte';
	import * as z from 'zod';

	export let polymorphicId: string;
	export let documentId: string;
	export let readOnly = false;
	export let directorates: any[] = [];
	export let staffDbId = '';
	export let formData: IPostingFormDto = {
		directorateId: '',
		departmentId: '',
		unitId: '',
		postingDate: null
	};
	const schema = z.object({
		directorateId: z
			.string({ invalid_type_error: 'Directorate is required' })
			.min(1, 'Directorate is required'),
		departmentId: z
			.string({ invalid_type_error: 'Department is required' })
			.min(1, 'Department is required'),
		unitId: z.string({ invalid_type_error: 'Unit is required' }).min(1, 'Unit is required'),
		postingDate: z
			.string({ invalid_type_error: 'Posting Date is required' })
			.min(1, 'Posting date is required')
	});
	let departments: any[] = [];
	let loadDirectorate = true;
	let loadDepartment = false;
	let loadUnit = false;
	let renderId = 0;
	let renderUnit = 0;
	let busy = false;
	let renderForm = 0;
	let units: any[] = [];
	let isLoading = true;
	const dispatch = createEventDispatcher();

	async function readDeparments({ detail }: CustomEvent) {
		const { id } = detail;
		if (!id) return;
		try {
			loadDepartment = true;
			const ret = await axios.get('/applicationsetup/directorate/department', { params: { id } });
			if (!ret.data.success) {
				showError(ret.data.message || 'Failed to load departments');
				return;
			}
			departments = ret.data.data.map((x: any) => ({ id: x.id, label: x.departmentName }));
			renderId++;
		} catch (error: any) {
			showError(error);
		} finally {
			loadDepartment = false;
		}
	}
	async function readUnits({ detail }: CustomEvent) {
		const { id } = detail;
		if (!id) return;
		try {
			loadUnit = true;
			const ret = await axios.get(`/applicationsetup/departments/units`, { params: { id } });
			if (!ret.data.success) {
				showError(ret.data.message || 'Failed to load units');
				return;
			}
			units = ret.data.data.map((x: any) => ({ id: x.id, unitName: x.unitName }));
			renderUnit++;
		} catch (error: any) {
			showError(error);
		} finally {
			loadUnit = false;
		}
	}

	function handleChange({ detail }: any) {
		const { values } = detail;
		if (!readOnly) formData = values;
	}

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			const d: PostingsDto = {
				polymorphicId: null,
				staffId: staffDbId,
				directorateId: values.directorateId,
				departmentId: values.departmentId,
				unitId: values.unitId,
				postingDate: dayjs(values.postingDate).format('YYYY-MM-DD')
			};
			const ret = await addPostingDetails(d);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo('Staff has been successfully posted');
			if ($page.url.pathname === '/staffrequests') {
				dispatch('removeItem', { tabId: documentId });
			}
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			endProgress();
			busy = false;
		}
	}

	onMount(async () => {
		if (directorates.length === 0) {
			try {
				const ret = await readDirectorates();
				if (!ret.success) {
					showError(ret.message);
					return;
				}
				directorates = ret.data.map((x: IDirectorate) => ({ id: x.id, name: x.directorateName }));
			} catch (error: any) {
				showError(error?.message || error);
			} finally {
				isLoading = false;
			}
		} else {
			isLoading = false;
		}
		if (formData.directorateId) {
			await readDeparments({ detail: { id: formData.directorateId } } as CustomEvent);
			renderForm++;
		}
		if (formData.departmentId) {
			await readUnits({ detail: { id: formData.departmentId } } as CustomEvent);
			renderForm++;
		}
	});
</script>

{#if isLoading}
	<div class="w-full h-52"><PageLoader size={50} /></div>
{:else}
	{#key renderForm}
		<Form
			{schema}
			initialValues={formData}
			class="space-y-6"
			on:change={handleChange}
			on:submit={handleSubmit}
		>
			<SelectField
				label="Directorate"
				name="directorateId"
				required
				options={directorates}
				clearable={false}
				on:change={readDeparments}
				readonly={readOnly}
			/>
			{#key renderId}
				<SelectField
					label="Department"
					name="departmentId"
					required
					options={departments}
					isLoading={loadDepartment}
					on:change={readUnits}
					clearable={false}
					readonly={readOnly}
				/>
			{/key}
			{#key renderId}
				{#key renderUnit}
					<SelectField
						label="Unit"
						name="unitId"
						required
						options={units}
						isLoading={loadUnit}
						clearable={false}
						readonly={readOnly}
					/>
				{/key}
			{/key}

			<DateField label="Posting date" name="postingDate" readonly={readOnly} />
			<div class="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4" class:hidden={readOnly}>
				<Button label="Reset" type="reset" />
				<Button label="Submit" type="submit" color="success" {busy} />
			</div>
		</Form>
	{/key}
{/if}
