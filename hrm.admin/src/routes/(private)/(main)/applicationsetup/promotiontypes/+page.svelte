<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: '#',
			accessor: 'id',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Name',
			accessor: 'name',
			plugins: {
				sort: { disable: true }
			}
		}
	];
</script>

<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Editor from './editor.svelte';
	// import PlanYear from '$modules/setup/planyear/index.svelte';
	export let data;
	$activePage = {
		title: 'Promotion Types',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Promotion Types', path: '' }
		],
		true
	);
</script>

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<DatatablePage
			tableColumns={columns}
			tableDataInfo={data.data}
			editorComponent={Editor}
			showEditorIn="side-modal"
			addButtonLabel="New Record"
			addNewHeading="New Record"
			updateHeading="Update Record"
			sideModalSize="sm"
			showModalButtons
			fillSpace={false}
		/>
	</Box>
</div>
