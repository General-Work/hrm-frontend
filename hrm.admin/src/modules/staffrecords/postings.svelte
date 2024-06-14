<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { showError } from '$lib/utils';
	import { readDepartmentsInADirectorate, readDirectorates, type IDirectorate } from '$svc/setup';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import * as z from 'zod';

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
	let directorates: any[] = [];
	let departments: any[] = [];
	let loadDirectorate = true;
	let loadDepartment = false;
	let loadUnit = false;
	let renderId = 0;
	let renderUnit = 0;
	let units: any[] = [];
	let formData = {
		directorateId: '',
		departmentId: '',
		unitId: '',
		postingDate: null
	};
	let olData = {
		directorateId: '',
		departmentId: '',
		unitId: '',
		postingDate: null
	};

	async function readDeparments(id: string) {
		if (!id) return;
		console.log(id, olData.directorateId);
		if (id === olData.directorateId) return;
		try {
			loadDepartment = true;
			const ret = await axios.get('/applicationsetup/directorate/department', { params: { id } });
			// console.log(ret.data)
			if (!ret.data.success) {
				showError(ret.data.message || 'Failed to load departments');
				return;
			}
			departments = ret.data.data.map((x: any) => ({ value: x.id, label: x.departmentName }));
			// renderId++
		} catch (error: any) {
			showError(error);
		} finally {
			loadDepartment = false;
		}
	}
	async function readUnits(id: string) {
		if (!id) return;
		if (id === olData.unitId) return;
		try {
			loadUnit = true;
			const ret = await axios.get(`/applicationsetup/departments/units`, { params: { id } });
			if (!ret.data.success) {
				showError(ret.data.message || 'Failed to load units');
				return;
			}
			units = ret.data.data.map((x: any) => ({ id: x.id, unitName: x.unitName }));
			// renderId++
		} catch (error: any) {
			showError(error);
		} finally {
			loadUnit = false;
		}
	}

	function handleChange({ detail }: any) {
		const { values, data } = detail;
		// formData = values;
		data.subscribe((val: typeof formData) => {
			if (val.directorateId !== olData.directorateId) {
				formData = { ...val, departmentId: '', unitId: '' };
			} else if (
				val.directorateId &&
				val.departmentId &&
				val.departmentId !== olData.departmentId
			) {
				formData = { ...val, unitId: '' };
			} else {
				formData = val;
			}
		});
	}
	$: if (formData.directorateId) {
		readDeparments(formData.directorateId);
		olData = { ...olData, directorateId: formData.directorateId };
		formData = { ...formData, directorateId: '' };
	} else {
		departments = [];
		olData = { ...olData, departmentId: '' };
	}

	$: if (formData.departmentId) {
		readUnits(formData.departmentId);
		olData = { ...olData, departmentId: formData.departmentId };
		formData = { ...formData, departmentId: '' };
	} else {
		units = [];
		olData = { ...olData, departmentId: '' };
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

<Form {schema} initialValues={formData} class="space-y-6" on:change={handleChange}>
	<SelectField
		label="Directorate"
		name="directorateId"
		required
		options={directorates}
		clearable={false}
		isLoading={loadDirectorate}
		on:change={() => {
			renderId++;
		}}
	/>
	{#key renderId}
		<SelectField
			label="Department"
			name="departmentId"
			required
			options={departments}
			isLoading={loadDepartment}
			on:change={() => renderUnit++}
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
		<Button label="Submit" type="submit" color="success" />
	</div>
</Form>
