<script lang="ts">
	import { page } from '$app/stores';
	import { activePage, documentKinds } from '$data/appStore';
	import RequestTable from '$modules/staffrequests/requestTable.svelte';
	import { extractQueryParam } from '$lib/utils';
	import Tabs, { type ITab } from '$cmps/ui/tabs.svelte';
	import DocumentViewer from '$cmps/documents/documentViewer.svelte';
	import { refetchDatatable } from '$cmps/ui/datatablePage.svelte';

	$: searchParam = extractQueryParam($page.url.search) ?? '';
	$activePage = {
		title: 'Staff Requests',
		showBreadCrumb: false
		// dropdownOptions: Object.values(data.documentKinds),
		// currentDropdownOption:
		// 	searchParam && data.documentKinds
		// 		? data.documentKinds[searchParam]
		// 		: data.documentKinds['all']
	};

	let activeTab = '1';

	let tabs: ITab[] = [
		{
			label: 'Home',
			id: '1',
			component: RequestTable,
			isClosable: false,
			props: {
				searchParam,
				requestTypes: Object.values(documentKinds),
				currentRequest:
					searchParam && documentKinds ? documentKinds[searchParam] : documentKinds['all']
			}
		}
	];

	function addTab({ detail }: CustomEvent) {
		if (tabs.find((x) => x.id === detail.id)) {
			activeTab = detail.id;
			return;
		}
		const formattedRequestType = detail.requestType.replace(/-/g, ' ').toLocaleUpperCase();
		tabs = [
			...tabs,
			{
				id: detail.id,
				isClosable: true,
				component: DocumentViewer,
				label: `${formattedRequestType} - ${detail.requestFromStaff ? detail.requestFromStaff.staffIdentificationNumber : ''}`,
				props: {
					title: '',
					documentId: detail.id,
					documentType: detail.requestType,
					polymorphicId: detail.requestDetailPolymorphicId,
					staffId: detail.requestFromStaff ? detail.requestFromStaff.staffIdentificationNumber : '',
					documentStatus: detail.status
				}
			}
		];
		activeTab = detail.id;
	}
	function removeTab({ detail }: CustomEvent) {
		const { tabId, refresh } = detail;
		tabs = tabs.filter((tab) => tab.id !== tabId);
		activeTab = tabs[tabs.length - 1].id;

		if (refresh) {
			refetchDatatable();
		}
	}
</script>

<div class="w-full h-full custom-container pt-4">
	<!-- <RequestTable
		tableDataInfo={data.data}
		{searchParam}
		requestTypes={Object.values(data.documentKinds)}
		currentRequest={searchParam && data.documentKinds
			? data.documentKinds[searchParam]
			: data.documentKinds['all']}
	/> -->
	<Tabs {tabs} bind:activeTab on:removeItem={removeTab} on:addTab={addTab} on:addItem={addTab} />
</div>
