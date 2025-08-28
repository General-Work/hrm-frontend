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
			header: 'Year',
			accessor: 'year',
			plugins: {
				sort: { disable: true }
			}
		}
	];
	export async function create(data: any) {
		// return await axios.post('/usermanagement', data);
	}

	export async function read() {
		// return await axios.get('/usermanagement');
	}
</script>

<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import Editor from './editor.svelte';
</script>

<DatatablePage
	tableColumns={columns}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Leave Year"
	addNewHeading="New Leave Year"
	updateHeading="Update Leave Year"
	sideModalSize="sm"
	showModalButtons
	fillSpace={false}
/>
