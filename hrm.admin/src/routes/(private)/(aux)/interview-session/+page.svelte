<script lang="ts">
	import Tabs, { type ITab } from '$cmps/ui/tabs.svelte';
	import { activePage } from '$data/appStore';
	import Main from './main.svelte';
	import RecordsViewer from '$routes/(private)/(main)/staffrecords/RecordsViewer.svelte';

	export let data;

	$: $activePage = {
		title: data.data.name,
		showBreadCrumb: false
	};

	let tabs: ITab[] = [
		{
			id: '1',
			component: Main,
			props: {
				tableDataInfo: data.tableData
			},
			label: 'Home',
			isClosable: false
		}
	];
	let activeTab = '1';
	function removeTab({ detail }: CustomEvent) {
		const { tabId } = detail;
		tabs = tabs.filter((tab) => tab.id !== tabId);
		activeTab = tabs[tabs.length - 1].id;
	}
	function addTab({ detail }: CustomEvent) {
		if (tabs.find((x) => x.id === detail.id)) {
			activeTab = detail.id;
			return;
		}
		tabs = [
			...tabs,
			{
				id: detail.id,
				isClosable: true,
				component: RecordsViewer,
				label: `${detail.lastName} - ${detail.staffIdentificationNumber}`,
				props: {
					viewerUsage: 'interview',
					staffId: detail.staffIdentificationNumber
				}
			}
		];
		activeTab = detail.id;
	}
</script>

<div class="w-full h-full pt-4">
	<Tabs {tabs} bind:activeTab on:addTab={addTab} on:removeItem={removeTab} />
</div>
