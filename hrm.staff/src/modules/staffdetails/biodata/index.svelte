<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
</script>

<SlideDown>
	<ScrollArea otherClasses="w-full h-full pt-3 px-1">
		<Fieldset label="Contact Info" icon="fluent-mdl2:edit-contact" kind="pink">
			<Form class="w-full h-full flex flex-col gap-6">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<SelectField label="Title" required />
					<TextField label="First name" required />
					<TextField label="Surname" required />
					<TextField label="Other name(s)" />
					<SelectField label="Gender" required />
					<DateField label="Date of Birth" required />
					<TextField label="ECOWAS Card No." />
					<TextField label="SSNIT No." />
					<TextField label="Phone" />
					<TextField label="Email" />
					<TextField label="GPS Address" />
					<SelectField label="Disability" required />
				</div>
				<div class="flex justify-end gap-2 md:pb-8 pt-3">
					<Button label="Reset" type="reset" />
					<Button label="Submit" type="submit" color="primary" />
				</div>
			</Form>
		</Fieldset>
	</ScrollArea>
</SlideDown>
