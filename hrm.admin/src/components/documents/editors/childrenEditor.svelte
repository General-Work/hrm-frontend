<script lang="ts" context="module">
	export interface IChildrenDetails {
		status: 'PENDING';
		id: string;
		children: {
			childName: string;
			dateOfBirth: string;
			gender: string;
			id: string;
		}[];
	}
</script>

<script lang="ts">
	import { Avatar } from 'flowbite-svelte';

	import FieldPair from '$cmps/ui/fieldPair.svelte';
	import Title from '$cmps/ui/title.svelte';
	import dayjs from 'dayjs';

	export let data: IChildrenDetails;
	export let hideTitle = false;
</script>

<div>
	{#if !hideTitle}
		<Title label="Children Details" icon="clarity:bank-solid" />
	{/if}

	{#if data.children}
		{#each data.children as { childName, dateOfBirth, gender }, index}
			<div class="pt-3 space-y-2">
				<div class="bg-primary-500 w-fit text-sm py-1 px-2 rounded-[5px] flex items-center gap-1">
					Child <Avatar size="xs">{index + 1}</Avatar>
				</div>
				<FieldPair label="Child Name" subLabel={childName || '-'} />
				<FieldPair
					label="Date of Birth"
					subLabel={dayjs(dateOfBirth).format('DD-MMMM-YYYY') || '-'}
				/>
				<FieldPair label="Gender" subLabel={gender || '-'} />
			</div>
		{/each}
	{/if}
</div>
