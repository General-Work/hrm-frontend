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

<SlideDown transitionIn="slide">
	<ScrollArea otherClasses="w-full h-full pt-3 px-1">
		<Form class="w-full h-full flex flex-col gap-6">
			<Fieldset label="Parents' Info" icon="fluent-mdl2:edit-contact" kind="pink">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<TextField label="Father's Name" required />
					<TextField label="Mother's Name" required />
				</div>
			</Fieldset>
			<Fieldset label="Spouse's Info" icon="fluent-mdl2:edit-contact" kind="pink">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<TextField label="Name" required />
					<TextField label="Phone Number" required />
				</div>
			</Fieldset>
			<Fieldset label="Next of Kin Info" icon="fluent-mdl2:edit-contact" kind="pink">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<TextField label="Name" required />
					<TextField label="Phone Number" required />
				</div>
			</Fieldset>
			<Fieldset
				label="Emergency Contact"
				icon="fluent-mdl2:edit-contact"
				kind="pink"
		
			>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<TextField label="Name" required />
					<TextField label="Phone Number" required />
				</div>
			</Fieldset>
			<div class="flex justify-end gap-2 md:pb-8 pt-3">
				<Button label="Reset" type="reset" />
				<Button label="Submit" type="submit" color="primary" />
			</div>
		</Form>
	</ScrollArea>
</SlideDown>
