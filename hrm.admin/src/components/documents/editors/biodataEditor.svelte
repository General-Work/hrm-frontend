<script lang="ts">
	import FieldPair from '$cmps/ui/fieldPair.svelte';
	import Title from '$cmps/ui/title.svelte';
	import type { IStaff } from '$lib/types';
	import dayjs from 'dayjs';

	export let data: IStaff;
	export let hideTitle = false;

	// console.log(data);
</script>

<div>
	<div class="space-y-2">
		{#if !hideTitle}
			<Title label="Bio Data" icon="fluent:person-32-filled" />
		{/if}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
			<FieldPair label="Title" subLabel={data.title} isColumn={false} />
			<FieldPair label="First Name" subLabel={data.firstName} isColumn={false} />
			<FieldPair label="Surname" subLabel={data.lastName} isColumn={false} />
			<FieldPair label="Othername(s)" subLabel={data.otherNames || '-'} isColumn={false} />
			<FieldPair label="Gender" subLabel={data.gender} isColumn={false} />
			<!-- <FieldPair label="Citizenship" subLabel={data.citizenship} isColumn={false} />
			<div class:hidden={!(data.citizenship === 'GHANAIAN')}>
				<FieldPair label="ECOWAS Card Number" subLabel={data.ecowasCardNumber} isColumn={false} />
			</div>
			<div class:hidden={data.citizenship === 'GHANAIAN'}>
				<FieldPair label="Passport Number" subLabel={data.passportNumber} isColumn={false} />
			</div> -->
			<FieldPair
				label="Date of Birth"
				subLabel={dayjs(data.dateOfBirth).format('ddd DD MMM, YYYY')}
				isColumn={false}
			/>
			<FieldPair label="SSNIT No." subLabel={data.snnitNumber || '-'} isColumn={false} />
			<FieldPair label="Phone One" subLabel={data.phone} isColumn={false} />
			<!-- <FieldPair label="Phone Two" subLabel={data.phoneTwo || '-'} isColumn={false} /> -->
			<FieldPair label="Email" subLabel={data.email || '-'} isColumn={false} />
			<FieldPair label="GPS" subLabel={data.gpsAddress || '-'} isColumn={false} />
			<FieldPair label="Disability" subLabel={data.disability} isColumn={false} />
		</div>
	</div>
</div>
