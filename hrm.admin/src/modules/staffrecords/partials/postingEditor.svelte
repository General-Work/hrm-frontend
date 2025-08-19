<script lang="ts">
	import type { IStaffByID } from '$lib/types';
	import { onMount } from 'svelte';
	import type { IPostingFormDto } from '../postings.svelte';
	import { showError } from '$lib/utils';
	import { readStaffById } from '$svc/staff';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import Postings from '../postings.svelte';
	import { readDirectorates, type IDirectorate } from '$svc/setup';

	export let staffNumber = '';
	export let readonly = true;
	let staff: IStaffByID = {} as IStaffByID;
	let formData: IPostingFormDto = {} as IPostingFormDto;
	let busy = true;
	let directorate: any[] = [];
	onMount(async () => {
		try {
			const [staffRes, directorateRes] = await Promise.all([
				readStaffById(staffNumber),
				readDirectorates()
			]);
			if (!staffRes.success) {
				showError(staffRes.message);
				return;
			}
			staff = staffRes.data;
			formData = {
				directorateId: staff?.staffPosting?.directorateId || '',
				departmentId: staff?.staffPosting?.departmentId || '',
				unitId: staff?.staffPosting?.unitId || '',
				postingDate: staff?.staffPosting?.postingDate || null
			} as IPostingFormDto;
			if (directorateRes.success) {
				directorate = directorateRes.data.map((x: IDirectorate) => ({
					id: x.id,
					label: x.directorateName
				}));
			}
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			busy = false;
		}
	});

	// $: console.log({ readonly });
</script>

{#if busy}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:else}
	<Postings
		readOnly={readonly}
		{formData}
		polymorphicId=""
		documentId=""
		directorates={directorate}
		updating={!readonly}
		staffDbId={staff.id}
	/>
{/if}
