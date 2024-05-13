<script lang="ts">
	import FileUpload from '$cmps/forms/fileUpload.svelte';
	import Form from '$cmps/forms/form.svelte';
	import Helper from '$cmps/ui/helper.svelte';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import z from 'zod';
	import { ctxKey, member, type IMember } from '../bioData.svelte';
	import { fileOrStringValidation } from '$lib/utils';
	export let data = {
		passportPicture: null,
		birthCertificate: null,
		highestQualificationCertificate: null,
		nssCertificate: null
	};
	let busy = false;
	let isValid = false;
	let renderId = 0;

	let existingFileUrls: any = {
		passportPictureUrl: '',
		birthCertificateUrl: '',
		highestQualificationCertificateUrl: '',
		nssCertificateUrl: ''
	};

	const dispatch = createEventDispatcher();
	const schema = z.object({
		passportPicture: fileOrStringValidation(existingFileUrls, 'passportPictureUrl'),
		birthCertificate: fileOrStringValidation(existingFileUrls, 'birthCertificateUrl'),
		highestQualificationCertificate: fileOrStringValidation(
			existingFileUrls,
			'highestQualificationCertificateUrl'
		),
		nssCertificate: fileOrStringValidation(existingFileUrls, 'nssCertificateUrl')
	});
	function handleSubmit({ detail }: any) {
		const { values } = detail;
		dispatch('message', { type: 'attachments', data: values });
	}

	function clearImageUrl(name: string) {
		return () => {
			existingFileUrls[name] = '';
		};
	}

	onMount(() => {
		if ($member.attachments) {
			// data = $store.attachments;
			existingFileUrls = {
				passportPictureUrl: ($member.attachments.passportPicture as string) ?? '',
				birthCertificateUrl: ($member.attachments.birthCertificate as string) ?? '',
				highestQualificationCertificateUrl:
					($member.attachments.highestQualificationCertificate as string) ?? '',
				nssCertificateUrl: ($member.attachments.nssCertificate as string) ?? ''
			};
			renderId++;
		}
	});
</script>

<Form {schema} initialValues={data} on:submit={handleSubmit} class="pl-2 flex flex-col gap-4">
	<Helper>
		<p>
			Upload all required attachments. <b>Upload should be of type .jpeg, .png, or .jpg</b>
		</p>
	</Helper>
	<FileUpload
		label="Passport Picture"
		name="passportPicture"
		required
		acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
		bind:existingFileUrl={existingFileUrls.passportPictureUrl}
		on:clearFileUrl={clearImageUrl('passportPictureUrl')}
	/>
	<FileUpload
		label="Birth Certificate"
		name="birthCertificate"
		required
		acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
		bind:existingFileUrl={existingFileUrls.birthCertificateUrl}
		on:clearFileUrl={clearImageUrl('birthCertificateUrl')}
	/>
	<FileUpload
		label="Highest Qualification Certificate"
		name="highestQualificationCertificate"
		required
		acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
		bind:existingFileUrl={existingFileUrls.highestQualificationCertificateUrl}
		on:clearFileUrl={clearImageUrl('highestQualificationCertificateUrl')}
	/>
	<FileUpload
		label="NSS Certificate"
		name="nssCertificate"
		required
		acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
		bind:existingFileUrl={existingFileUrls.nssCertificateUrl}
		on:clearFileUrl={clearImageUrl('nssCertificateUrl')}
	/>

	<slot {isValid} {busy} />
</Form>
