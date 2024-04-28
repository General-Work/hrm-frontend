<script lang="ts">
	import Button from '$cmps/ui/button.svelte';
	import { showError, showInfo } from '$lib/utils';
	import { createEventDispatcher, onMount } from 'svelte';

	export let values: any;

	let isLoading = false;

	let list: number[] = [];
	let inputRefs: { value: string; index: number }[] = [];
	let renderId = 0;

	const dispatch = createEventDispatcher();

	onMount(() => {
		list = [...Array(Number(values.maximumStep)).keys()];
		inputRefs = Array.from({ length: list.length }, (_, index) => ({
			value: '',
			index: index + 1
		}));
	});

	const clearForm = () => {
		inputRefs.forEach((input) => {
			if (input) input.value = '';
		});
		renderId++;
	};

	const submitSalary = async () => {
		isLoading = true;

		try {
			await Promise.all(
				inputRefs.map(async (x: any) => {
					// You need to replace this with the actual function or API call
					// to post salary step data
					// await postSalaryStep(x);
				})
			);

			// props.doneSaving() // You need to replace this with the actual function call
			showInfo('done');
			dispatch('close');
		} catch (err: any) {
			showError(err.message || err);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex flex-col gap-6">
	<!-- Your FormInformativeInscription component here -->

	<div class="flex justify-center items-center h-full">
		<div class="flex flex-col gap-3 w-full">
			<p>Grade: {values?.grade}</p>
			<p>Scale: {values?.scale}</p>
			<p>Band: {values?.level + values?.high || 0}</p>
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
		<Button color="primary" label="Save" on:click={submitSalary} disabled={isLoading} />
	</div>
</div>
