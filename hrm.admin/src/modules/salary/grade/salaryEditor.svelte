<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import { postGradeSalary } from '$svc/salaries';
	import { createEventDispatcher, onMount } from 'svelte';
	import * as z from 'zod';

	export let values: any;
	export let gradeId: string;

	const schema = z.object({
		date: z.string()
	});

	let isLoading = false;
	let formData = {
		date: '01-Jan-2012',
		grade: values?.grade,
		scale: values.scale,
		band: values?.level + values?.high || 0
	};
	let list: number[] = [];
	let inputRefs: { value: number | null; index: number; baseSalary: number | null }[] = [];
	let renderId = 0;

	const dispatch = createEventDispatcher();

	onMount(() => {
		list = [...Array(Number(values.maximumStep)).keys()];
		inputRefs = Array.from({ length: list.length }, (_, index) => ({
			value: null,
			index: index + 1,
			baseSalary: null
		}));
	});

	const clearForm = () => {
		inputRefs.forEach((input) => {
			if (input) {
				input.value = null;
				input.baseSalary = null;
			}
		});
		renderId++;
	};

	const submitSalary = async () => {
		let error = false;
		inputRefs.forEach((x, index) => {
			if (x.value === null || x.baseSalary === null) {
				showError(`Salaries and baseSalary are required for item at index ${index + 1}`);
				error = true;
			}
		});

		if (error) return true;

		try {
			isLoading = true;
			startProgress();

			const d: any[] = inputRefs.map((x) => ({
				stepIndex: x.index,
				salary: x.value,
				marketPreBaseSalary: x.baseSalary
			}));
			const ret = await postGradeSalary(gradeId, d);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo('Successfully added grade');
			// props.doneSaving() // You need to replace this with the actual function call
			// showInfo('done');
			dispatch('close');
		} catch (err: any) {
			showError(err.message || err);
		} finally {
			isLoading = false;
			endProgress();
		}
	};
</script>

<div class="flex flex-col gap-6">
	<!-- Your FormInformativeInscription component here -->

	<div class="flex justify-center items-center h-full">
		<div class="flex flex-col gap-3 w-full">
			<Form {schema} initialValues={formData} class="grid grid-cols-2 gap-4">
				<TextField label="Grade" name="grade" readonly />
				<TextField label="Scale" name="scale" readonly />
				<TextField label="Band" name="band" readonly />
				<DateField label="Payment Date" name="date" />
			</Form>
		</div>
	</div>

	{#key renderId}
		<div class="grid grid-cols-1 h-full">
			<div class="flex-auto w-full">
				<div class="flex flex-col overflow-hidden w-full">
					<div class="flex-auto p-0">
						<div class="overflow-x-auto">
							<table class="w-full overflow-hidden">
								<thead class="bg-sky-200">
									<tr>
										<th
											class="px-6 py-2 text-left rtl:text-right whitespace-nowrap text-sm text-black dark:text-secondary-600"
										>
											Step
										</th>
										<th
											class="px-6 py-2 text-left rtl:text-right whitespace-nowrap text-sm text-black dark:text-secondary-600"
										>
											Salary
										</th>
										<th
											class="px-6 py-2 text-left rtl:text-right whitespace-nowrap text-sm text-black dark:text-secondary-600"
										>
											Market Base Salary
										</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-secondary-200 dark:divide-secondary-800">
									{#each list as x}
										<tr class="bg-white border-b">
											<td class="px-6 py-3 whitespace-nowrap">
												<div class="flex items-center">
													<h6 class="mb-0">{x + 1}</h6>
												</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap">
												<input
													bind:value={inputRefs[x].value}
													type="number"
													class="rounded-[2px] h-8 text-sm placeholder:text-xs"
													placeholder="Enter salary..."
												/>
											</td>
											<td class="px-6 py-3 whitespace-nowrap">
												<input
													bind:value={inputRefs[x].baseSalary}
													type="number"
													class="rounded-[2px] h-8 text-sm placeholder:text-xs"
													placeholder="Enter salary..."
												/>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/key}

	<div class="flex gap-2 justify-end my-4">
		<Button color="ghost" on:click={clearForm} label="Reset" />
		<Button
			color="primary"
			label="Save"
			on:click={submitSalary}
			disabled={isLoading}
			busy={isLoading}
		/>
	</div>
</div>
