<script lang="ts" context="module">
	import FieldPair from '$cmps/ui/fieldPair.svelte';
	import Title from '$cmps/ui/title.svelte';
	import type { IRequestStatus } from '$lib/types';
	import type { IProfessionalBody } from '$svc/setup';

	export interface IProfessionalLicenceDetails {
		createdAt: Date;
		expiryDate: string;
		id: string;
		issuedDate: string;
		pin: string;
		status: IRequestStatus;
		updatedAt: Date;
		professionalBody: IProfessionalBody;
	}

	// 	professionalBodyId: string;
	// pin: string;
	// issuedDate: string;
	// expiryDate: string;
</script>

<script lang="ts">
	export let data: IProfessionalLicenceDetails;
	export let hideTitle = false;
</script>

<div>
	{#if !hideTitle}
		<Title label="Professional Licence" icon="clarity:bank-solid" />
	{/if}
	<div class="p-6 space-y-4">
		<FieldPair label="Professional Body" subLabel={data?.professionalBody?.name || '-'} />
		<FieldPair label="PIN" subLabel={data.pin} />
		<FieldPair label="Date issued" subLabel={data.issuedDate || '-'} />
		<FieldPair label="Expiry Date" subLabel={data.expiryDate} />
	</div>
</div>
