<script>
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
</script>

<SlideDown >
	<ScrollArea otherClasses="w-full h-full pt-3 px-1">
		<Fieldset
			label="Contact Info"
			icon="fluent-mdl2:edit-contact"
			kind="none"
			legendDiv="text-[#cc0033] bg-orange-600/20"
			fieldsetDiv="text-[#cc0033] border-[#cc0033]"
		>
			<Form class="w-full h-full flex flex-col gap-6">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<SelectField label="Title" required placeholder="Select an option" />
					<TextField label="First name" required placeholder="Enter your first name" />
					<TextField label="Surname" required placeholder="Enter your surname" />
					<TextField label="Other name(s)" placeholder="Enter your other name(s) if any" />
					<SelectField label="Gender" required placeholder="Select an option" />
					<DateField label="Date of Birth" required placeholder="Select your date of birth" />
					<TextField label="ECOWAS Card No." placeholder="GHA-123456789-0"/>
					<TextField label="SSNIT No." />
					<TextField label="Phone" placeholder="0240 123 456"/>
					<TextField label="Email" name="email"/>
					<TextField label="GPS Address" placeholder="GA-123-0123" />
					<SelectField label="Disability" required placeholder="Select an option"/>
				</div>
				<div class="flex justify-end gap-2 md:pb-8 pt-3">
					<Button label="Reset" type="reset" color="gold" />
					<Button label="Submit" type="submit" color="darkBlue" />
				</div>
			</Form>
		</Fieldset>
	</ScrollArea>
</SlideDown>
