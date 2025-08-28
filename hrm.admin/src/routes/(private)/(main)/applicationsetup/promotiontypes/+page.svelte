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

	async function load() {
		const res = {
			success: true,
			message: '',

			status: 200,
			data: {
				totalCount: 3,
				totalPages: 1,
				currentPage: 1,
				pageSize: 17,
				nextPageUrl: null,
				previousPageUrl: null,
				links: [],
				path: 'http://hrm-backend-vsa.fly.dev/api/staff/all?pageNumber=1&pageSize=17&search=&sort=updatedAt_desc',
				data: [
					{ id: '1', name: 'First Promotion' },
					{ id: '2', name: 'Subsequent Promotion' },
					{ id: '3', name: 'Special Promotion' }
				]
			}
		};

		return generateDataTableProps(res.data);
	}
</script>

<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import { generateDataTableProps } from '$lib/utils';
	import Editor from './editor.svelte';
	// import PlanYear from '$modules/setup/planyear/index.svelte';
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
			editorComponent={Editor}
			showEditorIn="side-modal"
			addButtonLabel="New Record"
			addNewHeading="New Record"
			updateHeading="Update Record"
			sideModalSize="sm"
			showModalButtons
			fillSpace={false}
			read={load}
		/>
	</Box>
</div>
