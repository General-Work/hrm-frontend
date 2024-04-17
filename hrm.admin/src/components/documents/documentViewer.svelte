<script lang="ts" context="module">
	// load all supported components
	// import type { IButtonConfig } from '$cmps/layout/actionButton.svelte';
	import { setMapper } from '$cmps/canvas/ComponentRenderer.svelte';

	const map: Record<string, ConstructorOfATypedSvelteComponent> = {
		staffRegistration: RegistrationEditor,
		annualLeavePlan: LeavePlanEditor
	};

	function textToComponent(typeName: string): ConstructorOfATypedSvelteComponent {
		return map[typeName] || null;
	}

	function initMappers() {
		setMapper(textToComponent);
	}
</script>

<script lang="ts">
	import { ulid } from 'ulid';
	import RightPanel from './panel.svelte';
	import Canvas from '$cmps/canvas/index.svelte';
	import type { IComponentDescriptor } from '$cmps/canvas/types';
	import { onDestroy, onMount } from 'svelte';
	import { extractQueryParam, showError } from '$lib/utils';
	import { browser } from '$app/environment';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import { modalConfig } from '$data/appStore';
	import { page } from '$app/stores';
	import RegistrationEditor from './editors/registrationEditor.svelte';
	import LeavePlanEditor from './editors/leavePlanEditor.svelte';

	initMappers(); // set the component mappers

	export let title: string;
	export let documentId: string;
	export let showActions = true;
	export let meta: any = {};
	export let requestData: any = {};
	let elements: IComponentDescriptor[] = [];
	let document: any = { actions: [], otherActions: [] };
	let scrollingDiv: HTMLElement = {} as HTMLElement;

	async function loadDocument() {
		// return document
		// try {
		// 	const ret = await getDocumentMetaData(documentId);
		// 	if (!ret.success) {
		// 		showError(ret.message);
		// 		return;
		// 	}
		// 	// console.log(document);
		// 	$actions = ret.data.actions;
		// 	document = ret.data;
		// 	return true;
		// } catch (e: any) {
		// 	showError(e?.message || e);
		// 	return false;
		// }
	}

	// var onDocumentUpdateStore: OnDocumentUpdateStore;
	onMount(async () => {
		// try {
		// 	if (!(await loadDocument())) {
		// 		return;
		// 	}
		// title = document.title;
		// 	add(
		// 		{
		// 			type: document.viewer,
		// 			// type: 'recommendLoan',
		// 			collapsed: false,
		// 			collapsible: false,
		// 			closable: false,
		// 			title: '',
		// 			props: { documentId: document.id }
		// 		},
		// 		true
		// 	); // sample current form data
		// 	const ret = await onDocumentUpdate(documentId);
		// 	if (ret.success) {
		// 		onDocumentUpdateStore = ret.store;
		// 		onDocumentUpdateStore.subscribe(async (x) => {
		// 			await loadDocument();
		// 		});
		// 	} else {
		// 		showError(ret.message);
		// 	}
		// } catch (e: any) {
		// 	showError(e?.message || e);
		// }

		if (!meta) {
			return;
		}
		title = extractQueryParam($page.url.search, 'type').toLocaleLowerCase();
		add(
			{
				type: meta.component,
				// type: 'recommendLoan',
				collapsed: false,
				collapsible: false,
				closable: false,
				title: '',
				props: { requestId: documentId, data: requestData }
			},
			true
		);
	});

	onDestroy(async () => {
		// await onDocumentUpdateStore?.unlisten();
		// $actions = [];
	});

	function add(descriptor: IComponentDescriptor, insertTop: boolean = false) {
		if (descriptor.id) {
			// likely this has already been added. For now, just skip it. Later, set focus to it.
			// on delete, we need to clear the id so it can be re-added
			console.log('Viewer already set', descriptor);
			return;
		}
		// descriptor = { ...descriptor }; // todo: remove so the single entry restriction is enforced
		descriptor.id = ulid();
		if (insertTop) elements = [descriptor, ...elements];
		else elements = [...elements, descriptor];
		// if (scrollingDiv) {
		// 	setTimeout(() => {
		// 		scrollToBottom();
		// 	}, 500);
		// }
	}

	function onAction({ detail }: any) {
		// console.log(detail);
		if (!detail.cmd) {
			showError('No command defined');
			return;
		}
		const cmd = detail.cmd;
		switch (cmd.action) {
			case 'inlineViewer':
				if (!cmd.args) {
					showError('No arguments provided for inlineViewer. No action will be taken');
					return;
				}
				add(
					{ ...cmd.args, closable: true, collapsible: true, collapsed: false },
					cmd.insertTop ?? false
				);
				break;
			case 'modalViewer':
				if (!cmd.args) {
					showError('No arguments provided for modalViewer. No action will be taken');
					return;
				}
				modalConfig.update((current) => {
					return {
						...current,
						show: true,
						size: cmd.args?.props?.size || 'xs',
						title: cmd.args?.title || '',
						componentConfig: { ...cmd.args, showTitle: false, title: '' },
						onDone: async (refresh: boolean) => {
							if (refresh) await loadDocument();
							if (browser) window.history.back();
						}
					};
				});
				break;
			default:
				showError(`No handler defiined for command ${cmd.action}`);
				break;
		}
	}

	function closeAComponent({ detail }: any) {
		const { id, data } = detail;
		elements = elements.filter((x) => x.id !== id);
	}

	function toggleCollapse({ detail }: any) {
		const index = elements.findIndex((x) => x.id === detail);

		if (index !== -1) {
			const updatedElement = { ...elements[index] };

			updatedElement.collapsed = !updatedElement.collapsed;

			const updatedElements = [...elements];
			updatedElements[index] = updatedElement;

			elements = updatedElements;
		}
	}

	function scrollToBottom() {
		if (!scrollingDiv) {
			return true;
		}

		scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
	}
</script>

<div class="h-full flex flex-col w-full">
	<div
		class="flex-grow shadow-lgx flex bg-gray-100x xborder-1 w-full h-full"
		style="box-shadowx: 0 2px 2px rgba(204,197,185,.5)"
	>
		<!-- add p-2 to the class -->
		<ScrollArea otherClasses="flex-grow rounded-lg p-2  h-full w-full ">
			<Canvas
				bind:scrollingDiv
				children={elements}
				on:close={closeAComponent}
				on:toggleCollapse={toggleCollapse}
			/>
		</ScrollArea>
		<div class="h-full flex-grow flex">
			<RightPanel
				{showActions}
				actions={meta.actions}
				otherActions={document.otherActions}
				status={meta.status}
        feeds={meta.feeds}
				on:click={onAction}
				{documentId}
			/>
		</div>
	</div>
</div>
