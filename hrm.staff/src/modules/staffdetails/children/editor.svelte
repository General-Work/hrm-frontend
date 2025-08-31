<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import IconButton from '$cmps/ui/iconButton.svelte';
	import { GENDERLIST } from '$lib/constants';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import { postChildrenDetail } from '$svc/staffdetails';
	import axios from 'axios';
	import dayjs from 'dayjs';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import * as z from 'zod';

	const schema = z.object({
		childName: z.string().min(1, 'Required'),
		dateOfBirth: z.string().min(1, 'Required'),
		gender: z.string().min(1, 'Required')
	});

	let busy = false;
	const dispatch = createEventDispatcher();

	// Current form values
	let currentForm = {
		childName: '',
		dateOfBirth: null as string | null,
		gender: ''
	};

	// Checkout array for added children
	let checkoutChildren: Array<{
		childName: string;
		dateOfBirth: string;
		gender: string;
		id: number; // Unique ID for each child
	}> = [];

	let nextId = 1;
	let renderId = 0;

	// Add current form to checkout
	function addToCheckout(values: any) {
		const newChild = {
			...values,
			dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : '',
			id: nextId++
		};

		checkoutChildren = [...checkoutChildren, newChild];

		// Reset form
		currentForm = {
			childName: '',
			dateOfBirth: null,
			gender: ''
		};
		renderId++;
	}

	// Remove child from checkout
	function removeFromCheckout(id: number) {
		checkoutChildren = checkoutChildren.filter((child) => child.id !== id);
	}

	// Handle form submission (add to checkout)
	function handleAddChild({ detail }: CustomEvent) {
		const { values } = detail;
		addToCheckout(values);
	}

	// Submit all children in checkout
	async function submitAll() {
		if (checkoutChildren.length === 0) {
			showError('Please add at least one child');
			return;
		}

		try {
			startProgress();
			busy = true;

			// const ret = await axios.post('/profile/children', {
			// 	children: checkoutChildren
			// });

			const d = checkoutChildren.map((x) => ({
				childName: x.childName,
				dateOfBirth: x.dateOfBirth,
				gender: x.gender
			}));

			const ret = await postChildrenDetail(d);

			if (!ret.success) {
				showError(ret.message);
				return;
			}

			showInfo(`Successfully added ${checkoutChildren.length} children`);
			dispatch('close');
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
			endProgress();
		}
	}

	// Clear entire checkout
	function clearCheckout() {
		checkoutChildren = [];
	}
</script>

<div class="p-4 w-full flex gap-3">
	<div class=" w-3/5 bg-gray-50/50 p-4 shadow rounded-lg">
		{#key renderId}
			<Form initialValues={currentForm} class="space-y-4" {schema} on:submit={handleAddChild}>
				<TextField label="Full name of child" name="childName" required />
				<DateField label="Date of Birth" name="dateOfBirth" required maxDate={dayjs().toDate()} />
				<SelectField label="Gender" name="gender" required labelAsValue options={GENDERLIST} />

				<div class="flex gap-2 pt-3">
					<Button label="Reset" type="reset" />
					<Button label="Add Child" type="submit" color="primary" />
				</div>
			</Form>
		{/key}
	</div>
	<div class="w-2/5">
		{#if checkoutChildren.length > 0}
			<div transition:slide class="border rounded-lg p-4">
				<div class="flex justify-between items-center mb-4">
					<h3 class="xs">
						{checkoutChildren.length}
						{checkoutChildren.length === 1 ? 'child' : 'children'} added
					</h3>
					<button class="sm" on:click={clearCheckout} disabled={busy}>Clear all</button>
					<button class="sm flex items-center gap-1" disabled={busy} on:click={submitAll}>
						Submit all
						{#if busy}
							<iconify-icon icon="svg-spinners:180-ring-with-bg" class="text-green-500" />
						{/if}
					</button>
				</div>

				<div class="space-y-3 max-h-64 overflow-y-auto">
					{#each checkoutChildren as child}
						<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
							<div>
								<p class="font-medium">{child.childName}</p>
								<p class="text-sm text-gray-600">
									{dayjs(child.dateOfBirth).format('MMM D, YYYY')} • {child.gender}
								</p>
							</div>
							<IconButton icon="ic:round-close" on:click={() => removeFromCheckout(child.id)} />
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="h-full w-full flex justify-center items-center">
				<div class="flex flex-col justify-center items-center text-gray-400">
					<iconify-icon icon="nrk:media-404-notfound" style="font-size: 40px;" />
					<p class="text-center text-gray-400">No record found</p>
				</div>
			</div>
		{/if}
	</div>
</div>
