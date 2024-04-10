<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
</script>

<SlideDown transitionIn="slide">
	<ScrollArea otherClasses="w-full h-full pt-3 px-1">
		<Fieldset label="Banking Info" icon="mdi:bank-outline" kind="pink">
			<Form class="w-full h-full flex flex-col gap-6">
				<div class="grid gap-6">
					<SelectField label="Bank Name" required />
					<TextField label="Branch" required />
					<SelectField label="Account Type" />
					<TextField label="Account Number" required />
				</div>
				<div class="flex justify-end gap-2 md:pb-8 pt-3">
					<Button label="Reset" type="reset" />
					<Button label="Submit" type="submit" color="primary" />
				</div>
			</Form>
		</Fieldset>
	</ScrollArea>
</SlideDown>
