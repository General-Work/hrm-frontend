<script>
	import FieldPair from '$cmps/ui/fieldPair.svelte';
	import Title from '$cmps/ui/title.svelte';
</script>

<div >
	<Title label="Bank Details" icon="clarity:bank-solid" />
	<div class="p-6 space-y-4">
		<FieldPair label="Bank Name" subLabel="Ecobank" />
		<FieldPair label="Branch" subLabel="Tesano" />
		<FieldPair label="Account Name" subLabel="Paul Jackson" />
		<FieldPair label="Account Number" subLabel="12345690232323" />
	</div>
</div>
