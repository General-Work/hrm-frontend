<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import Tabs, { type ITab } from '$cmps/ui/tabs.svelte';
	import { activePage } from '$data/appStore';
	import StaffTable from '$modules/staffTable.svelte';
	import MainPage from './MainPage.svelte';
	import RecordsViewer from './RecordsViewer.svelte';
	export let data;
	$activePage = {
		title: 'Staff Records',
		showBreadCrumb: false
	};

	let activeTab = '1';

	let tabs: ITab[] = [
		{
			label: 'Home',
			id: '1',
			component: MainPage,
			isClosable: false,
			props: {
				data: data.data
			}
		}
	];

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
					viewerUsage: 'records',
					staffNumber: detail.staffIdentificationNumber,
					staffDbId: detail.id
				}
			}
		];
		activeTab = detail.id;
	}
</script>

<!-- <MemberSearchBox fetchFunction={readStaffWithStaffID} showAvatar href="/staffrecords" /> -->

<div class="w-full h-full custom-container pt-4">
	<!-- <Box bgWhite shadow rounded>
		<StaffTable tableDataInfo={data.data} />
	</Box> -->

	<Tabs {tabs} bind:activeTab on:removeItem={removeTab} on:addTab={addTab} on:addItem={addTab} />
</div>
