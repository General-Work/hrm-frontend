<script lang="ts" context="module">
	export interface IStaffRegistration {
		name: string;
	}
</script>

<script lang="ts">
	import FieldPair from '$cmps/ui/fieldPair.svelte';
	import AttachementsEditor from './attachementsEditor.svelte';

	export let data: IStaffRegistration;
	export let requestId = '';
</script>

<div>
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
		<FieldPair label="Title" subLabel="Mr" isColumn={false} />
		<FieldPair label="First Name" subLabel="James" isColumn={false} />
		<FieldPair label="Surname" subLabel="Ansah" isColumn={false} />
		<FieldPair label="Othername(s)" subLabel="Kwasi" isColumn={false} />
		<FieldPair label="Gender" subLabel="Male" isColumn={false} />
		<FieldPair label="Citizenship" subLabel="Ghanaian" isColumn={false} />
		<FieldPair label="ECOWAS Card Number" subLabel="GHA-123456789-1" isColumn={false} />
		<FieldPair label="Date of Birth" subLabel="1-January-1990" isColumn={false} />
		<FieldPair label="SSNIT No." subLabel="Ghanaian" isColumn={false} />
		<FieldPair label="Phone One" subLabel="0123567890" isColumn={false} />
		<FieldPair label="Phone Two" subLabel="0123567890" isColumn={false} />
		<FieldPair label="Email" subLabel="adusmail@gmail.com" isColumn={false} />
		<FieldPair label="GPS" subLabel="GA 1003- 12" isColumn={false} />
		<FieldPair label="Disability" subLabel="None" isColumn={false} />
		<FieldPair label="Highest Education Level" subLabel="-" isColumn={false} />
		<FieldPair label="Year of Completion" subLabel="-" isColumn={false} />
		<FieldPair label="Institution Name" subLabel="-" isColumn={false} />
	</div>
	<AttachementsEditor
		passportPicture="https://t3.ftcdn.net/jpg/03/73/52/24/360_F_373522464_UzkM3IvqgqpS0qIy2kpkB5QiV7Bw7NyS.jpg"
		birthCertificate="https://t3.ftcdn.net/jpg/03/73/52/24/360_F_373522464_UzkM3IvqgqpS0qIy2kpkB5QiV7Bw7NyS.jpg"
		schoolCertificate="https://t3.ftcdn.net/jpg/03/73/52/24/360_F_373522464_UzkM3IvqgqpS0qIy2kpkB5QiV7Bw7NyS.jpg"
	/>
</div>
