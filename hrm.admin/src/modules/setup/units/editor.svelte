<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
	import { showError } from '$lib/utils';
	import {
		getUnitById,
		readDepartmentsInADirectorate,
		readDirectorates,
		type IDirectorate,
		type IUnit
	} from '$svc/setup';
	import type { IOkResult } from '$svc/shared';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let data: IUnit;
	export let isValid = false;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;
	let busy = true;
	let directorates: any[] = [];
	let departments: any[] = [];
	let renderId = 0;
	let loadDepartment = false;

	let initialValues = {
		departmentId: data.departmentId || '',
		unitHeadId: data.unitHeadId || '',
		directorateId: data.directorateId || '',
		unitName: data.unitName
	};

	function handleChange({ detail }: any) {
		const { values, form } = detail;
		initialValues = values;
		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}

	async function readDeparments(id: string) {
		try {
			loadDepartment = true;

			const ret = await readDepartmentsInADirectorate(id);
			if (!ret.success) {
				showError(ret.message || 'Failed to load departments');
				return;
			}
			departments = ret.data.map((x: any) => ({ id: x.id, departmentName: x.departmentName }));
			// renderId++
		} catch (error: any) {
			showError(error);
		} finally {
			loadDepartment = false;
		}
	}

	const schema = z.object({
		departmentId: z.string().min(1, 'Department is required'),
		directorateId: z.string().min(1, 'Department is required'),
		unitName: z.string().min(1, 'Unit Name is required'),
		unitHeadId: z.string().optional()
	});

	// $: if (initialValues.directorateId) {
	// 	readDeparments(initialValues.directorateId);
	// } else {
	// 	departments = [];
	// }

	function handleDirectorateChange({ detail }: CustomEvent) {
		if (!detail) return;
		readDeparments(detail.id);
	}

	onMount(async () => {
		try {
			// Load directorates first
			await loadDirectorates();

			// If no ID provided, we're creating a new unit
			if (!data.id) {
				return;
			}

			// Load unit details and related data for existing unit
			await loadUnitDetails();
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			busy = false;
		}
	});

	async function loadDirectorates() {
		try {
			const result = await readDirectorates();
			if (!result.success) {
				throw new Error(result.message);
			}

			directorates = result.data.map((x: IDirectorate) => ({
				id: x.id,
				directorateName: x.directorateName
			}));
		} catch (error: any) {
			showError(`${error?.message || error}`);
			throw error; // Re-throw to be caught by main handler
		}
	}

	async function loadUnitDetails() {
		try {
			const result = await getUnitById(data.id);
			if (!result.success) {
				throw new Error(result.message);
			}

			// Update initial values with unit data
			initialValues = {
				...initialValues,
				departmentId: result.data.departmentId,
				directorateId: result.data.directorateId
			};

			// Load departments for the selected directorate
			await readDeparments(initialValues.directorateId);
		} catch (error: any) {
			showError(`${error?.message || error}`);
			throw error; // Re-throw to be caught by main handler
		}
	}
</script>

{#if busy}
	<div class="w-full h-full flex justify-center items-center">
		<PageLoader size={50} />
	</div>
{:else}
	<SlideDown>
		<Form
			bind:this={form}
			{initialValues}
			on:change={handleChange}
			on:submit
			{schema}
			class="p-4 space-y-4"
		>
			<SelectField
				label="Directorate"
				name="directorateId"
				required
				options={directorates}
				on:change={handleDirectorateChange}
			/>
			{#key renderId}
				<SelectField
					label="Department"
					name="departmentId"
					required
					options={departments}
					isLoading={loadDepartment}
				/>
			{/key}
			<TextField label="Unit Name" name="unitName" required />
			<SelectField label="Unit Head" name="unitHeadId" />
		</Form>
	</SlideDown>
{/if}
