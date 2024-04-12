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
	// import { accessToken } from "../../lib/services/keycloak"
	// import { showError, showInfo } from "../../lib/utils"

	export let title = 'Click Browse or drop the file to upload';
	export let subTitle = '';
	export let url = '';
	export let name = 'file';
	export let allowMultiple = false;
	export let acceptedFileTypes = ["image/png", "image/jpeg", "application/pdf"];
	export let files: any[] = [];
	export let label = ''
	export let required = false
	export let showError = false
  export let imageOnly = false // when set, will restrict type to png and jpeg only

	const dispatch = createEventDispatcher();
	let loaded = false;
	let busy = false;
	let renderId = 0;

	const { touched, errors, data, setData }: any = getContext(key);
	let id = nanoid();

	function onChange(err: any, fileItem: any) {
		console.log(fileItem);
		const { file } = fileItem;

		setData({ ...$data, [name]: file });
		dispatch('change', { name, value: file });
	}

  $: if (imageOnly && acceptedFileTypes?.length ===3){
    acceptedFileTypes = ["image/png", "image/jpeg"]
  }
	$: hasError = $touched[name] && $errors[name]?.length;
	$: error = $errors[name]?.join(', ');

	let pond: any;
	let uploadOk;
	const uploadServerConfig = {
		// process: {
		//   url: url,
		//   headers: () => {
		//     return {
		//     "Authorization": `Bearer ${$accessToken}`
		//     }
		//   },
		//   onerror: x => {
		//     try {
		//       const resp = JSON.parse(x)
		//       if (!resp.success) {
		//         showError(resp.message || "Error uploading image")
		//         uploadOk = false
		//         dispatch("uploadFailed", resp)
		//         return
		//       }
		//       else {
		//         showInfo ("File uploaded successfully")
		//         uploadOk = true
		//         dispatch("uploaded")
		//       }
		//     } catch(e){
		//       showError(e.message)
		//       uploadOk = false
		//     } finally {
		//       busy = false
		//     }
		//   },
		//   onload: (x) => {
		//     try {
		//       const resp = JSON.parse(x)
		//       if (!resp.success) {
		//         showError(resp.message || resp.data || "Error uploading image")
		//         uploadOk = false
		//       }
		//       else {
		//         showInfo (resp.message || resp.data || "File uploaded successfully")
		//         uploadOk = true
		//         dispatch("uploaded")
		//       }
		//     } catch(e){
		//       showError(e.message)
		//       uploadOk = false
		//     } finally {
		//       busy = false
		//     }
		//   },
		//   ondata: x => {
		//     busy = true
		//     return x;
		//   }
		// }
	};
	// let files: any[] = [];
	// function reset() {
	// 	renderId++;
	// 	busy = false;
	// }

	onMount(async () => {
		loaded = true;
	});
	// $:if (value) {
	// 	console.log(pond)
	// 	// pond.file = value;
	// }
	// $: console.log(pond);

	function checkFiles(files: any) {
		// console.log('update', files);
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
</script>

<div class="flex flex-col flex-grow my-2">
	<!-- {#if busy}
		<Progress step={1} />
	{/if} -->
	<!-- {#key renderId} -->
	<label for={id} class="  font-medium text-gray-400">
		{label}
		{#if required}
			<span class="text-red-500 pl-1">*</span>
		{/if}
	</label>

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
	/>
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
	<!-- <button class="btn btn-accent btn-sm w-20" on:click={reset}>Reset</button> -->
	<!-- {/key} -->
</div>

<!-- onaddfile={(error, file) => {
	if (!error) {
		files = [...files, file];
	}
}} -->

<!-- {#each files as file (file.id)}
<div class="preview-item">
	{#if file.preview}
		<img src={file.preview} alt="Preview" style="max-width: 100px; max-height: 100px;" />
	{:else}
		<span>{file.filename}</span>
	{/if}
	<button on:click={() => FilePond.removeFile(file)}>Remove</button>
</div>
{/each} -->
