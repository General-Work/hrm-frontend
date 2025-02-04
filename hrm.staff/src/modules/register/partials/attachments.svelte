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
	let renderId = 0;

	let existingFileUrls: any = {
		passportPictureUrl: '',
		birthCertificateUrl: '',
		highestQualificationCertificateUrl: '',
		nssCertificateUrl: ''
	};

	const dispatch = createEventDispatcher();
	const schema = z.object({
		passportPicture: z.lazy(() => {
			if (existingFileUrls['passportPictureUrl'] && !data['passportPicture']) {
				return z.null();
			}
			return z.instanceof(File);
		}),
		birthCertificate: z.lazy(() => {
			if (existingFileUrls['birthCertificateUrl'] && !data['birthCertificate']) {
				return z.null();
			}
			return z.instanceof(File);
		}),
		highestQualificationCertificate: z.lazy(() => {
			if (
				existingFileUrls['highestQualificationCertificateUrl'] &&
				!data['highestQualificationCertificate']
			) {
				return z.null();
			}
			return z.instanceof(File);
		}),
		nssCertificate: z.lazy(() => {
			if (existingFileUrls['nssCertificateUrl'] && !data['nssCertificate']) {
				return z.null();
			}
			return z.instanceof(File);
		})
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

	function handleChange({ detail }: any) {
		// todo: properly dispose the subscriptions on destroy
		const { values } = detail;
		if (values) data = values;
	}
</script>

{#key renderId}
	<Form
		{schema}
		initialValues={data}
		on:submit={handleSubmit}
		on:change={handleChange}
		class="pl-2 flex flex-col gap-4"
		let:isValid
	>
		<Helper>
			<p>
				Upload all required attachments. <b>Upload should be of type .jpeg, .png, or .jpg</b>
			</p>
		</Helper>
		<FileUpload
			label="Passport Picture"
			name="passportPicture"
			allowCrop
			required
			acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
			bind:existingFileUrl={existingFileUrls.passportPictureUrl}
			on:clearFileUrl={clearImageUrl('passportPictureUrl')}
		/>
		<FileUpload
			label="Birth Certificate"
			name="birthCertificate"
			required
			allowCrop
			acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
			bind:existingFileUrl={existingFileUrls.birthCertificateUrl}
			on:clearFileUrl={clearImageUrl('birthCertificateUrl')}
		/>
		<FileUpload
			label="Highest Qualification Certificate"
			name="highestQualificationCertificate"
			required
			allowCrop
			acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
			bind:existingFileUrl={existingFileUrls.highestQualificationCertificateUrl}
			on:clearFileUrl={clearImageUrl('highestQualificationCertificateUrl')}
		/>
		<FileUpload
			label="NSS Certificate"
			name="nssCertificate"
			required
			allowCrop
			acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
			bind:existingFileUrl={existingFileUrls.nssCertificateUrl}
			on:clearFileUrl={clearImageUrl('nssCertificateUrl')}
		/>

		<slot {isValid} {busy} />
	</Form>
{/key}
