<script>
	import { page } from '$app/stores';
	import DocumentViewer from '$cmps/documents/documentViewer.svelte';

	// import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import { extractQueryParam } from '$types/utils';
	// import Specialty from '$modules/salary/specialty/index.svelte';

	export let data;
	$: searchParam = extractQueryParam($page.url.search) ?? '';
	$: requestId = $page.params.requestId;

	let title = 'Request';

	$: $activePage = {
		title,
		showBreadCrumb: true
	};
	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: `/staffrequests?q=${searchParam}` },
			{ title: `${title} - ${requestId}`, path: '' }
		],
		true
	);
</script>

<div class="w-full h-full">
	<DocumentViewer bind:title documentId={requestId} meta={data.meta} requestData={data.data} />
</div>
