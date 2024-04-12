<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import * as z from 'zod';

	export let isValid = false;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;
	let staffOptions: any[] = [];
	let formData = { staffId: '', email: '', department: '', role: null, unit: '', tags: [] };
	let renderId = 0;
	let roles = [{ id: 1, name: 'Super Admin' }];
	let userTags = ['Can review leave', 'Can review appriasal'];
	const schema = z.object({
		staffId: z.string().min(1, 'Staff is required'),
		department: z.string().min(1, 'Staff is required'),
		unit: z.string().min(1, 'Staff is required'),
		email: z.string().email(),
		role: z.number({ invalid_type_error: 'Role is required', required_error: 'Role is required' })
	});
	async function transformFunction(input: string) {
		try {
			// const res = await getStaff(input, Number(data.amountRequested));
			// guarantorName = res.name;
			staffOptions = [
				{
					staffId: input,
					label: 'Yaw Marfo',
					department: 'Operations',
					unit: 'IT',
					email: 'ymarfo@outlook.com'
				}
			];
			return staffOptions;
		} catch (err) {
			return [];
		}
	}
	function handleChange({ detail }: any) {
		const { form, data } = detail;
		data.subscribe((d: any) => {
			const { staffId, role, tags } = d;
			const m = staffId && staffOptions.length && staffOptions.find((z) => z.staffId === staffId);
			if (m) {
				formData = {
					staffId,
					email: m.email,
					department: m.department,
					role,
					unit: m.unit,
					tags
				};
			}
		});
		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}
</script>

{#key renderId}
	<Form
		{schema}
		initialValues={formData}
		class="p-4 space-y-4"
		on:change={handleChange}
		bind:this={form}
		on:submit
	>
		<SelectField
			label="Staff"
			required
			options={staffOptions}
			name="staffId"
			clearable
			placeholder="Search by Staff ID"
			fetch={transformFunction}
			max="1"
			on:change={() => renderId++}
		/>
		<TextField label="Email" name="email" readonly />
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<TextField label="Department" name="department" readonly />
			<TextField label="Unit" name="unit" readonly />
		</div>
		<SelectField label="Role" name="role" required placeholder="Select option" options={roles} />
		<SelectField
			label="Responsibilities"
			name="tags"
			placeholder="Select user responsibilities"
			multiple
			labelAsValue
			options={userTags}
		/>
	</Form>
{/key}
