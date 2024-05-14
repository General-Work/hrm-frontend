<script lang="ts" context="module">
	export interface IStaffRegistration {
		name: string;
	}
</script>

<script lang="ts">
	import FieldPair from '$cmps/ui/fieldPair.svelte';
	import Title from '$cmps/ui/title.svelte';
	import type { INewRegistration } from '$svc/staffrequests';
	import dayjs from 'dayjs';
	import AttachementsEditor from './attachementsEditor.svelte';

	export let data: INewRegistration;
</script>

<div>
	<div class="space-y-2">
		<Title label="Basic Info" icon="fluent:person-32-filled" />
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
			<FieldPair label="Title" subLabel={data.bioData.title} isColumn={false} />
			<FieldPair label="First Name" subLabel={data.bioData.firstName} isColumn={false} />
			<FieldPair label="Surname" subLabel={data.bioData.surName} isColumn={false} />
			<FieldPair label="Othername(s)" subLabel={data.bioData.otherNames || '-'} isColumn={false} />
			<FieldPair label="Gender" subLabel={data.bioData.gender} isColumn={false} />
			<FieldPair label="Citizenship" subLabel={data.bioData.citizenship} isColumn={false} />
			<div class:hidden={!(data.bioData.citizenship === 'GHANAIAN')}>
				<FieldPair
					label="ECOWAS Card Number"
					subLabel={data.bioData.ecowasCardNumber}
					isColumn={false}
				/>
			</div>
			<div class:hidden={data.bioData.citizenship === 'GHANAIAN'}>
				<FieldPair
					label="Passport Number"
					subLabel={data.bioData.passportNumber}
					isColumn={false}
				/>
			</div>
			<FieldPair
				label="Date of Birth"
				subLabel={dayjs(data.bioData.dateOfBirth).format('ddd DD MMM, YYYY')}
				isColumn={false}
			/>
			<FieldPair label="SSNIT No." subLabel={data.bioData.snnitNumber || '-'} isColumn={false} />
			<FieldPair label="Phone One" subLabel={data.bioData.phoneOne} isColumn={false} />
			<FieldPair label="Phone Two" subLabel={data.bioData.phoneTwo || '-'} isColumn={false} />
			<FieldPair label="Email" subLabel={data.bioData.email || '-'} isColumn={false} />
			<FieldPair label="GPS" subLabel={data.bioData.gpsAddress || '-'} isColumn={false} />
			<FieldPair label="Disability" subLabel={data.bioData.disability} isColumn={false} />
		</div>
	</div>
	<div class="space-y-2"></div>
	<Title label="Qualifications" icon="zondicons:education" />
	<div class="p-4">
		<FieldPair
			label="Highest Education Level"
			subLabel={data.bioData.highestQualification}
			isColumn={false}
		/>
		{#if data.bioData.educationalBackground}
			<div class="">
				{#each data.bioData.educationalBackground.reverse() as institution, index}
					<Title label={`Institution ${index + 1}`} />
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
						<FieldPair
							label="Institution Name"
							subLabel={institution.institutionName}
							isColumn={false}
						/>
						<FieldPair
							label="Certificate awarded"
							subLabel={institution.certificate}
							isColumn={false}
						/>
						<FieldPair
							label="Date of Completion"
							subLabel={dayjs(institution.yearCompleted).format('ddd DD MMM, YYYY')}
							isColumn={false}
						/>
					</div>
				{/each}
			</div>
		{/if}
		<Title label="NSS Details" />
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
			<FieldPair label="NSS Number" subLabel={data.bioData.nssNumber} isColumn={false} />
			<FieldPair
				label="Institution of service"
				subLabel={data.bioData.placeOfService}
				isColumn={false}
			/>
			<FieldPair
				label="Date of Completion"
				subLabel={dayjs(data.bioData.yearOfService).format('ddd DD MMM, YYYY')}
				isColumn={false}
			/>
		</div>
	</div>
	<div class="space-y-2">
		<Title label="Attachments" icon="dashicons:images-alt" />
		<AttachementsEditor
			passportPicture={data.bioData.passportPicture}
			birthCertificate={data.bioData.birthCertificate}
			schoolCertificate={data.bioData.highestQualificationCertificate}
			nssCertificate={data.bioData.nssCertificate}
		/>
	</div>
</div>
