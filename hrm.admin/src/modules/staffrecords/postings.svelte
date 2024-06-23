<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import type { IDirectorate } from '$svc/setup';
	import type { PostingsDto } from '$svc/staffrequests';
	import axios from 'axios';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let polymorphicId: string;
	export let isRequest: boolean;
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
	const id = $page.params.staffId;
	let directorates: any[] = [];
	let departments: any[] = [];
	let loadDirectorate = true;
	let loadDepartment = false;
	let loadUnit = false;
	let renderId = 0;
	let renderUnit = 0;
	let busy = false;
	let units: any[] = [];
	let formData = {
		directorateId: '',
		departmentId: '',
		unitId: '',
		postingDate: null
	};

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
		formData = values;
	}

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			const d: PostingsDto = {
				polymorphicId: polymorphicId,
				directorateId: values.directorateId,
				departmentId: values.departmentId,
				unitId: values.unitId,
				postingDate: dayjs(values.postingDate).format('YYYY-MM-DD')
			};
			const ret = await axios.post(`/staffrecords/${id}/postings`, d);
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			showInfo("Staff has been successfully posted");
			if (isRequest) {
				goto('/staffrequests');
			}
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			endProgress();
			busy = false;
		}
	}

	onMount(async () => {
		try {
			const ret = await axios.get('/applicationsetup/directorate');
			if (!ret.data.success) {
				showError('Failed to read directorates');
				return;
			}

			directorates = ret.data.data.map((x: IDirectorate) => ({
				id: x.id,
				directorateName: x.directorateName
			}));
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			loadDirectorate = false;
		}
	});
</script>

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
		isLoading={loadDirectorate}
		on:change={readDeparments}
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
			/>
		{/key}
	{/key}

	<DateField label="Posting date" name="postingDate" />
	<div class="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
		<Button label="Reset" type="reset" />
		<Button label="Submit" type="submit" color="success" {busy} />
	</div>
</Form>
