<script lang="ts" context="module">
	import { registerPlugin, supported } from 'svelte-filepond';
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
	registerPlugin(
		FilePondPluginImageExifOrientation,
		FilePondPluginImagePreview,
		FilePondPluginFileValidateType
	);
</script>

<script lang="ts">
	import { createEventDispatcher, onMount, getContext } from 'svelte';
	import FilePond from 'svelte-filepond';
	// import Progress from '../atoms/Progress.svelte';
	import { nanoid } from 'nanoid';
	import { key } from './form';
	import { fade } from 'svelte/transition';
	import FileDisplay from './fileDisplay.svelte';
	// import { accessToken } from "../../lib/services/keycloak"
	// import { showError, showInfo } from "../../lib/utils"

	export let title = 'Click Browse or drop the file to upload';
	export let subTitle = '';
	export let url = '';
	export let name = 'file';
	export let allowMultiple = false;
	export let acceptedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
	export let files: any[] = [];
	export let label = '';
	export let required = false;
	export let showError = false;
	export let imageOnly = false; // when set, will restrict type to png and jpeg only
	export let existingFileUrl = ''; // when set, will display the existing image.// when set, will restrict type to png and jpeg only

	const dispatch = createEventDispatcher();
	let loaded = false;

	const { touched, errors, data, setData }: any = getContext(key);
	let id = nanoid();

	$: if (imageOnly && acceptedFileTypes?.length === 3) {
		acceptedFileTypes = ['image/png', 'image/jpeg'];
	}
	$: hasError = $touched[name] && $errors[name]?.length;
	$: error = $errors[name]?.join(', ');

	let pond: any;
	let uploadOk;
	const uploadServerConfig = {};

	onMount(async () => {
		loaded = true;
	});

	function checkFiles(files: any) {
		if (files.length > 1) {
			const newFiles = files.map((x: any) => x.file);
			setData({ ...$data, [name]: newFiles });
			dispatch('change', { name, value: newFiles });
		} else if (files.length === 1) {
			const { file } = files[0];

			setData({ ...$data, [name]: file });
			dispatch('change', { name, value: file });
		}
	}

	function clearFileUrl() {
		dispatch('clearFileUrl');
	}
</script>

<div class="flex flex-col flex-grow my-2">
	<label for={id} class="  font-medium text-gray-400">
		{label}
		{#if required}
			<span class="text-red-500 pl-1">*</span>
		{/if}
	</label>
	{#if existingFileUrl}
		<FileDisplay url={existingFileUrl} on:clearFileUrl={clearFileUrl} />
	{:else}
		<FilePond
			{name}
			required={true}
			allowReplace={true}
			instantUpload={false}
			server={uploadServerConfig}
			{allowMultiple}
			allowRevert={true}
			allowImagePreview={true}
			allowImageResize={true}
			bind:this={pond}
			onupdatefiles={checkFiles}
			{files}
			{acceptedFileTypes}
			credits={false}
		/>
	{/if}
	{#if hasError && showError}
		<label
			for={id}
			transition:fade
			class="flex items-center gap-1 pt-1 text-sm"
			class:text-red-600={hasError}
		>
			<iconify-icon icon="solar:danger-circle-bold-duotone" />
			{error}
		</label>
	{/if}
</div>
