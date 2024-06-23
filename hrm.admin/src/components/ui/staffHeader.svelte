<script lang="ts">
	import { Avatar, Badge } from 'flowbite-svelte';
	import Box from './box.svelte';
	import type { IStaffHeader } from '$lib/types';

	export let data = {} as IStaffHeader;
</script>

<Box bgWhite rounded shadow otherClasses="p-4">
	<div class="flex flex-col lg:flex-row lg:items-center gap-4">
		<div class="flex justify-center lg:justify-start shrink-0">
			<Avatar src={data.passportPicture || ''} class="w-20 h-20 shrink-0" alt="pic" />
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex justify-center lg:justify-start items-center gap-5">
				<p class="text-[20px] uppercase">{data.fullName || '-'}</p>
				<Badge border color="green">{data.status || '-'}</Badge>
			</div>

			<div class="grid grid-cols-2 xl:grid-cols-3 gap-4 text-[14.5px]">
				<div>
					<p class="flex gap-1">
						<b>Staff ID: </b>
						<span class="truncate" title={data.staffId}>{data.staffId || '-'}</span>
					</p>
					<p class="flex gap-1">
						<b>Directorate:</b>
						<span class="truncate" title={data.directorate}>{data.directorate || '-'}</span>
					</p>
				</div>
				<div>
					<p class="flex gap-1">
						<b>Department:</b>
						<span class="truncate" title={data.department}>{data.department || '-'}</span>
					</p>
					<p class="flex gap-1">
						<b>Unit:</b> <span class="truncate" title={data.unit}>{data.unit || '-'}</span>
					</p>
				</div>
				<div>
					<p class="flex gap-1">
						<b>Phone:</b> <span class="truncate" title={data.phone}>{data.phone || '-'}</span>
					</p>
					<p class="flex gap-1">
						<b>Email:</b> <span class="truncate" title={data.email}>{data.email || '-'}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</Box>
