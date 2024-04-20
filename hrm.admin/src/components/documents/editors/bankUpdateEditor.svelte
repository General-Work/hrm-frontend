<script>
	import FieldPair from '$cmps/ui/fieldPair.svelte';
	import Title from '$cmps/ui/title.svelte';
</script>

<div >
	<Title label="Bank Details" icon="clarity:bank-solid" />
	<div class="p-6 space-y-4">
		<FieldPair label="Bank Name" subLabel="" />
		<FieldPair label="Branch" subLabel="" />
		<FieldPair label="Account Name" subLabel="" />
		<FieldPair label="Account Number" subLabel="" />
	</div>
</div>
