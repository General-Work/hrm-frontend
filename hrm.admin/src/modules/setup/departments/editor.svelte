<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import { showError } from '$lib/utils';
	import {
		getDepartmentById,
		readDirectorates,
		type IDepartment,
		type IDirectorate
	} from '$svc/setup';
	import type { IOkResult } from '$svc/shared';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let isValid = false;
	export let data: IDepartment;
	export const submit = () => {
		form.submit();
		return true;
	};
	let busy = true;
	let initialValues = {
		directorateId: data.directorateId || '',
		headOfDepartmentId: data.headOfDepartmentId || '',
		depHeadOfDepartmentId: data.depHeadOfDepartmentId || '',
		departmentName: data.departmentName
	};

	let form: any;
	let directorates: any[] = [];
	const schema = z.object({
		directorateId: z.string().min(1, 'Direcorate is required'),
		departmentName: z.string().min(1, 'Department Name is required'),
		headOfDepartmentId: z.string().optional(),
		depHeadOfDepartmentId: z.string().optional()
	});

	// $: console.log({ data });

	function handleChange({ detail }: any) {
		const { form } = detail;

		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}

	onMount(async () => {
		try {
			const directoratesResult = await readDirectorates();
			if (!directoratesResult.success) {
				showError(directoratesResult.message);
				busy = false;
				return;
			}

			directorates = directoratesResult.data.map((x: IDirectorate) => ({
				id: x.id,
				directorateName: x.directorateName
			}));

			if (!data.id) {
				busy = false;
				return;
			}

			const departmentResult = await getDepartmentById(data.id);
			if (!departmentResult.success) {
				showError(departmentResult.message);
				return;
			}

			initialValues = {
				...initialValues,
				directorateId: departmentResult.data.directorateId
			};
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			busy = false;
		}
	});
</script>

{#if busy}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:else}
	<Form
		{schema}
		bind:this={form}
		{initialValues}
		on:change={handleChange}
		on:submit
		class="p-4 space-y-4"
	>
		<SelectField label="Directorate" name="directorateId" required options={directorates} />
		<TextField label="Department Name" name="departmentName" />
		<SelectField label="HOD" name="headOfDepartmentId" />
		<SelectField label="Deputy HOD" name="depHeadOfDepartmentId" />
	</Form>
{/if}
