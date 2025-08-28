<script lang="ts" context="module">
	export interface IFamilyDetails {
		id: string;
		staffId: string;
		createdAt: Date;
		updatedAt: Date;
		fathersName: string;
		mothersName: string;
		spouseName: string;
		spousePhoneNumber: string;
		nextOfKIN: string;
		nextOfKINPhoneNumber: string;
		emergencyPerson: string;
		emergencyPersonPhoneNumber: string;
		staff: null;
		isApproved: boolean;
		isAlterable: boolean;
	}
</script>

<script lang="ts">
	import FieldPair from '$cmps/ui/fieldPair.svelte';

	import Title from '$cmps/ui/title.svelte';

	export let data: IFamilyDetails;
	export let hideTitle = false;
</script>

<div>
	{#if hideTitle}
		<Title label="Family Details" icon="fluent-mdl2:family" />
	{/if}
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
		<FieldPair label="Father's Name" subLabel={data.fathersName} isColumn={false} />
		<FieldPair label="Mother's Name" subLabel={data.mothersName} isColumn={false} />
		<FieldPair label="Spouse's Name" subLabel={data.spouseName} isColumn={false} />
		<FieldPair
			label="Spouse's Phone Number"
			subLabel={`0${data.spousePhoneNumber}`}
			isColumn={false}
		/>
		<FieldPair label="Next of Kin's Name" subLabel={data.nextOfKIN} isColumn={false} />
		<FieldPair
			label="Next of Kin's Phone Number"
			subLabel={`0${data.nextOfKINPhoneNumber}`}
			isColumn={false}
		/>
		<FieldPair label="Emergency Contact Person" subLabel={data.emergencyPerson} isColumn={false} />
		<FieldPair
			label="Emergency Contact Person Number"
			subLabel={`0${data.emergencyPersonPhoneNumber}`}
			isColumn={false}
		/>
	</div>
</div>
