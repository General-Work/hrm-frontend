<script lang="ts" context="module">
	export interface IAccomodationData {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		staffId: string;
		source: string;
		gpsAddress: string;
		accomodationType: string;
		allocationDate: string | null;
		flatNumber: string;
		isApproved: boolean;
		isAlterable: boolean;
		staff: null;
	}
</script>

<script lang="ts">
	import FieldPair from '$cmps/ui/fieldPair.svelte';

	import Title from '$cmps/ui/title.svelte';
	import dayjs from 'dayjs';

	export let data: IAccomodationData;
</script>

<div>
	<Title label="Accomodation Details" icon="clarity:bank-solid" />
	<div class="p-6 space-y-4">
		<FieldPair label="Source" subLabel={data.source || '-'} />
		<FieldPair label="GPS Address" subLabel={data.gpsAddress || '-'} />
		<FieldPair label="Accomodation Type" subLabel={data.accomodationType || '-'} />
		<FieldPair label="Flat Number" subLabel={data.flatNumber || '-'} />
		<FieldPair
			label="Allocation Date"
			subLabel={data?.allocationDate
				? dayjs(data.allocationDate).format('ddd DD, MMMM, YYYY')
				: '-'}
		/>
	</div>
</div>
