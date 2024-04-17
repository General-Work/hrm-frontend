<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import { activePage } from '$data/appStore';
	import RequestTable from '$modules/staffrequests/requestTable.svelte';
	import { extractQueryParam } from '$types/utils';
	export let data;

	$: searchParam = extractQueryParam($page.url.search) ?? '';
	$activePage = {
		title: 'Staff Requests',
		showBreadCrumb: false,
		dropdownOptions: Object.values(data.documentKinds),
		currentDropdownOption:
			searchParam && data.documentKinds
				? data.documentKinds[searchParam]
				: data.documentKinds['all']
	};
</script>

<RequestTable tableDataInfo={data.data} {searchParam} />
