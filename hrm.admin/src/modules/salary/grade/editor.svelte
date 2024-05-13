<script lang="ts" context="module">
	export interface IGradeDto {
		category: number;
		grade: string;
		scale: string;
		level: string;
		high: string;
		marketPremium: number;
		minimumStep: number;
		maximumStep: number;
	}
</script>

<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import * as z from 'zod';
	import { onMount } from 'svelte';
	import { showError } from '$lib/utils';
	import type { IOkResult } from '$svc/shared';
	import type { ICategory } from '$svc/salaries';

	export let isValid = false;
	export let optionalData: any;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;

	let formData = {
		categoryId: null,
		grade: '',
		scale: '',
		level: null,
		high: '',
		marketPremium: null,
		minimumStep: null,
		maximumStep: null
	};
	const schema = z.object({
		grade: z.string().min(1, 'Name is required'),
		scale: z.string().min(1, 'Scale is required'),
		level: z.number({
			invalid_type_error: 'Level is required',
			required_error: 'Level is required'
		}),
		categoryId: z
			.string({
				invalid_type_error: 'Category is required',
				required_error: 'Category is required'
			})
			.min(1, 'Category is required'),
		high: z.string().min(1, 'This is required'),
		marketPremium: z.number({
			invalid_type_error: 'Market Premium is required',
			required_error: 'Market Premium is required'
		}),
		minimumStep: z.number({
			invalid_type_error: 'Minimum Step is required',
			required_error: 'Minimum Step is required'
		}),
		maximumStep: z.number({
			invalid_type_error: 'Maximum Step is required',
			required_error: 'Maximum Step is required'
		})
	});
	const high = ['H', 'L'];
	const scale = ['SSPS', 'HSSS'];
	let category: any[] = [];
	function handleChange({ detail }: any) {
		const { form } = detail;
		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}

	onMount(async () => {
		if (optionalData.category) {
			try {
				const ret: IOkResult<any> = await optionalData.category;
				if (!ret.success) {
					showError(ret.message || 'Failed to load Categories');
				}
				category = ret.data.map((x: ICategory) => ({ id: x.id, name: x.categoryName }));
			} catch (e: any) {
				showError(e);
			}
		}
	});
</script>

<Form
	{schema}
	initialValues={formData}
	class="p-4 space-y-5"
	on:submit
	on:change={handleChange}
	bind:this={form}
>
	<SelectField
		name="categoryId"
		label="Category"
		required
		placeholder="Select category"
		options={category}
	/>
	<TextField name="grade" label="Name of grade" required placeholder="Enter name of grade" />
	<SelectField
		name="scale"
		label="Scale"
		required
		placeholder="Select scale"
		options={scale}
		labelAsValue
	/>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		<TextField name="level" label="Level" required placeholder="Enter level" type="number" />
		<SelectField
			label="High / Low"
			name="high"
			required
			placeholder="Select high / low"
			options={high}
			labelAsValue
		/>
	</div>
	<TextField
		name="marketPremium"
		label="Market Premium (%)"
		required
		placeholder="Enter market premium"
		type="number"
	/>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		<TextField name="minimumStep" label="Minimum Step" required type="number" />
		<TextField name="maximumStep" label="Maximum Step" required type="number" />
	</div>
</Form>
