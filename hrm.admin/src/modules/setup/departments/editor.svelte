<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import { showError } from '$lib/utils';
	import type { IDepartment, IDirectorate } from '$svc/setup';
	import type { IOkResult } from '$svc/shared';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let isValid = false;
	export let data: IDepartment;
	export let optionalData: Record<string, any>;
	export const submit = () => {
		form.submit();
		return true;
	};
	let renderId = 0;
	let initialValues = {
		directorateId: '',
		headOfDepartmentId: '',
		depHeadOfDepartmentId: '',
		departmentName: ''
	};

	let form: any;
	let directorates: any[] = [];
	const schema = z.object({
		directorateId: z.string().min(1, 'Direcorate is required'),
		departmentName: z.string().min(1, 'Department Name is required'),
		headOfDepartmentId: z.string().optional(),
		depHeadOfDepartmentId: z.string().optional()
	});

	function handleChange({ detail }: any) {
		const { form } = detail;

		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}

	onMount(async () => {
		if (optionalData.directorates) {
			try {
				const ret: IOkResult<any> = await optionalData.directorates;
				if (!ret.success) {
					showError(ret.message);
					return;
				}
				directorates = ret.data.map((x: IDirectorate) => ({
					id: x.id,
					directorateName: x.directorateName
				}));
				// console.log(directorates)
			} catch (error: any) {
				showError(error);
			}
		}
		if (data) {
			initialValues = {
				directorateId: data.directorateId || '',
				headOfDepartmentId: data.headOfDepartmentId || '',
				depHeadOfDepartmentId: data.depHeadOfDepartmentId || '',
				departmentName: data.departmentName
			};
			renderId++;
		}
	});
</script>

{#key renderId}
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
{/key}
