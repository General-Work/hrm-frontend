<script lang="ts" context="module">
	export interface IBankDetails {
		id: string;
		staffId: string;
		createdAt: Date;
		updatedAt: Date;
		bankId: string;
		bankName: string;
		accountType: string;
		branch: string;
		accountNumber: string;
		accountName: string;
		staff: null;
		isApproved: boolean;
		isAlterable: boolean;
		bank: null;
	}
</script>

<script lang="ts">
	import FieldPair from '$cmps/ui/fieldPair.svelte';
	import Title from '$cmps/ui/title.svelte';

	export let data: IBankDetails;

</script>

<div>
	<Title label="Bank Details" icon="clarity:bank-solid" />
	<div class="p-6 space-y-4">
		<FieldPair label="Bank Name" subLabel={data?.bank.bankName || '-'} />
		<FieldPair label="Branch" subLabel={data.branch} />
		<FieldPair label="Account Name" subLabel={data.accountName || '-'} />
		<FieldPair label="Account Number" subLabel={data.accountNumber} />
		<FieldPair label="Account Type" subLabel={data.accountType || '-'} />
	</div>
</div>
