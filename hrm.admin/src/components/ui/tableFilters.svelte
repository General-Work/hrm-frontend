<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import * as z from 'zod';
	import Button from './button.svelte';
	import ControlField from '$cmps/forms/controlField.svelte';
	import { createEventDispatcher } from 'svelte';
	export let requestTypes: any[] = [];
	export let currentRequest: any = {};

	const dispatch = createEventDispatcher();
	const schema = z.object({});
	let formData = {
		requestType: '',
		startDate: '',
		endDate: '',
		remember: ''
	};

	$: if (currentRequest) {
		// console.log(currentRequest)
		formData = { ...formData, requestType: currentRequest.path };
	}
</script>

<Form
	class="w-full bg-gradient-to-b from-indigo-100 via-teal-50 to-[#f7f6f2] py-1"
	{schema}
	initialValues={formData}
	on:submit
>
	<fieldset class=" rounded-[5px] px-4 py-1.5">
		<!-- <legend class="  tracking-wide px-2 text-sm border rounded-[5px]"
			>Filters</legend
		> -->
		<div class="flex flex-col lg:flex-row gap-2">
			<div class=" flex-grow max-w-7xl">
				<div class="grid grid-col-1 lg:grid-cols-4 gap-3 items-center">
					<SelectField
						options={requestTypes.map((x) => ({ path: x.path, title: x.title }))}
						placeholder="Request Types"
						name="requestType"
						on:change={({ detail }) => dispatch('typeChange', detail.path)}
						clearable={false}
					/>
					<DateField
						name="startDate"
						placeholder="Start Date"
						on:change={({ detail }) => dispatch('startDate', detail.dateStr)}
					/>
					<DateField
						name="endDate"
						placeholder="End Date"
						on:change={({ detail }) => dispatch('endDate', detail.dateStr)}
					/>
					<ControlField label="Remember this " name="remember" type="checkbox" />
				</div>
			</div>
			<!-- <Button
				leadingIcon="streamline:send-email-solid"
				label="Submit"
				otherClasses="py-1.5 lg:py-0 bg-blue-100 border-blue-300 hover:bg-blue-200 lg:ml-2"
				type="submit"
			/> -->
			<Button
				on:click
				label="Reset Filters"
				leadingIcon="lets-icons:close-round-fill"
				otherClasses="py-1.5 px-1.5 text-sm lg:py-0 bg-red-50 border-red-300 hover:bg-red-100"
				type="reset"
			/>
		</div>
	</fieldset>
</Form>
