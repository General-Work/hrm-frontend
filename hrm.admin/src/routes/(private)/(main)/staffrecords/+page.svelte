<script lang="ts">
	// import Box from '$cmps/ui/box.svelte';
	import Tabs, { type ITab } from '$cmps/ui/tabs.svelte';
	import { activePage } from '$data/appStore';
	// import StaffTable from '$modules/staffTable.svelte';
	import MainPage from './MainPage.svelte';
	import RecordsViewer from './RecordsViewer.svelte';
	// export let data;
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
			isClosable: false
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

	function handleReload({ detail }: any) {
		console.log({ detail });
		const tabIdx = tabs.findIndex((x) => x.id === detail.id);
		if (tabIdx !== -1) {
			// Create a new object to force Svelte to re-render the component
			const tab = tabs[tabIdx];
			tabs = [
				...tabs.slice(0, tabIdx),
				{ ...tab, props: { ...tab.props, _reload: Date.now() } },
				...tabs.slice(tabIdx + 1)
			];
			activeTab = detail.id;
		}
	}
</script>

<!-- <MemberSearchBox fetchFunction={readStaffWithStaffID} showAvatar href="/staffrecords" /> -->

<div class="w-full h-full custom-container pt-4">
	<!-- <Box bgWhite shadow rounded>
		<StaffTable tableDataInfo={data.data} />
	</Box> -->

	<Tabs
		{tabs}
		bind:activeTab
		on:removeItem={removeTab}
		on:addTab={addTab}
		on:addItem={addTab}
		on:reload={handleReload}
	/>
</div>
