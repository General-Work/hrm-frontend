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
	let units: any[] = [];
	let formData = {
		directorateId: '',
		departmentId: '',
		unitId: '',
		postingDate: null
	};

	async function readDeparments(id: string) {
		try {
			const ret = await axios.get('/applicationsetup/directorate/department', { params: { id } });
			if (!ret.data.success) {
				showError(ret.data.message || 'Failed to load departments');
				return;
			}
			departments = ret.data.data.map((x: any) => ({ value: x.id, label: x.departmentName }));
		} catch (error: any) {
			showError(error);
		}
	}
	async function readUnits(id: string) {
		try {
			const ret = await axios.get(`/applicationsetup/departments/units`, { params: { id } });
			if (!ret.data.success) {
				showError(ret.data.message || 'Failed to load units');
				return;
			}
			units = ret.data.data.map((x: any) => ({ id: x.id, unitName: x.unitName }));
		} catch (error: any) {
			showError(error);
		}
	}

	function handleChange({ detail }: any) {
		const { values } = detail;
		formData = values;
	}
	$: if (formData.directorateId) {
		readDeparments(formData.directorateId);
	} else {
		departments = [];
	}

	$: if (formData.departmentId) {
		readUnits(formData.departmentId);
	} else {
		units = [];
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
		}
	});
</script>

<Form {schema} initialValues={formData} class="space-y-6" on:change={handleChange}>
	<SelectField label="Directorate" name="directorateId" required options={directorates} />
	<SelectField label="Department" name="departmentId" required options={departments} />
	<SelectField label="Unit" name="unitId" required options={units} />
	<DateField label="Posting date" name="postingDate" />
	<div class="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
		<Button label="Reset" type="reset" />
		<Button label="Submit" type="submit" color="success" />
	</div>
</Form>
