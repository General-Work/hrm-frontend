<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import * as z from 'zod';
	import Button from './button.svelte';
	import ControlField from '$cmps/forms/controlField.svelte';
	export let requestTypes: any[] = [];
	export let currentRequest: any = {};

	const schema = z.object({});
	let formData = {
		requestType: '',
		dateRange: '',
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
			<div class=" flex-grow max-w-4xl">
				<div class="grid grid-col-1 lg:grid-cols-3 gap-3 items-center">
					<SelectField
						options={requestTypes.map((x) => ({ path: x.path, title: x.title }))}
						placeholder="Request Types"
						name="requestType"
					/>
					<DateField mode="range" name="dateRange" placeholder="Filter by date range" />
					<ControlField label="Remember this " name="remember" type="checkbox" />
				</div>
			</div>
			<Button
				leadingIcon="streamline:send-email-solid"
				label="Submit"
				otherClasses="py-1.5 lg:py-0 bg-blue-100 border-blue-300 hover:bg-blue-200 lg:ml-2"
				type="submit"
			/>
			<Button
				on:click
				label="Reset"
				leadingIcon="lets-icons:close-round-fill"
				otherClasses="py-1.5 lg:py-0 bg-red-100 border-red-300 hover:bg-red-200 lg:ml-2"
				type="reset"
			/>
		</div>
	</fieldset>
</Form>
