<script lang="ts" context="module">
	// load all supported components
	// import type { IButtonConfig } from '$cmps/layout/actionButton.svelte';
	import { setMapper } from '$cmps/canvas/ComponentRenderer.svelte';

	const map: Record<string, ConstructorOfATypedSvelteComponent> = {
		staffRegistration: RegistrationEditor,
		annualLeavePlan: LeavePlanEditor,
		rejectRequest: RejectRequestEditor,
		acceptRequest: AcceptRequestEditor,
		transferRequest: TransferEditor,
		bankUpdate: BankUpdateEditor,
		biodata: BiodataEditor,
		familyDetails: FamilyDetails,
		accomodation: AccomodationEditor,
		appointementDetailsForm: AppointmentDetails,
		postingDetailsForm: Postings,
		professionalLicence: ProfessionalLicenceEditor
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
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
	import { extractQueryParam, showError } from '$lib/utils';
	import { browser } from '$app/environment';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import { hideRightDrawer, modalConfig, sideQuickActions } from '$data/appStore';
	import { page } from '$app/stores';
	import RegistrationEditor from './editors/registrationEditor.svelte';
	import LeavePlanEditor from './editors/leavePlanEditor.svelte';
	import RejectRequestEditor from './editors/rejectRequestEditor.svelte';
	import AcceptRequestEditor from './editors/acceptRequestEditor.svelte';
	import TransferEditor from './editors/transferEditor.svelte';
	import BankUpdateEditor from './editors/bankUpdateEditor.svelte';
	import BiodataEditor from './editors/biodataEditor.svelte';
	import type { DocumentKind, ISideMenu } from '$lib/types';
	import { goto } from '$app/navigation';
	import FamilyDetails from './editors/familyDetails.svelte';
	import AccomodationEditor from './editors/accomodationEditor.svelte';
	import { readRequest } from '$svc/staffrequests';
	import { getActions, getComponent, getSupportingData } from '$lib/requestMetaData';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import { slide } from 'svelte/transition';
	import AppointmentDetails from '$modules/staffrecords/appointmentDetails.svelte';
	import Postings from '$modules/staffrecords/postings.svelte';
	import ProfessionalLicenceEditor from './editors/professionalLicenceEditor.svelte';

	initMappers(); // set the component mappers

	export let title: string;
	export let documentId: string;
	export let showActions = true;
	export let meta: any = {};
	export let requestData: any = {};
	export let documentType: DocumentKind = '';
	export let polymorphicId = '';
	export let staffId = '';
	export let documentStatus = '';
	let elements: IComponentDescriptor[] = [];
	let document: any = { actions: [], otherActions: [] };
	let scrollingDiv: HTMLElement = {} as HTMLElement;
	let busy = true;

	const dispatch = createEventDispatcher();

	onMount(async () => {
		try {
			const ret = await readRequest(documentId);
			// console.log({ ret });
			// console.log({ documentType });

			if (ret.success) {
				requestData = ret.data;
				const currentStatatus =
					documentType === 'new-registeration' &&
					ret.data.applicationStatus !== 'PENDING' &&
					ret.data.applicationStatus !== 'APPROVED'
						? ret.data.applicationStatus
						: documentStatus;
				meta = {
					component: getComponent(documentType),
					data: ret.data,
					actions: getActions(
						documentType,
						documentId,
						polymorphicId,
						currentStatatus,
						ret.data?.staff?.staffIdentificationNumber || staffId
					),
					otherActions: ret?.data?.previousData?.id
						? getSupportingData(documentType, documentId, ret.data.status, ret.data?.previousData)
						: [],
					status: currentStatatus
					// feeds: readRequestFeeds(id)
				};

				if (!meta) {
					return;
				}
				// title = extractQueryParam($page.url.search, 'type').toLocaleLowerCase();
				add(
					{
						type: meta.component,
						// type: 'recommendLoan',
						collapsed: false,
						collapsible: false,
						closable: false,
						title: '',
						props: { documentId: documentId, data: requestData }
					},
					true
				);
			}
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			busy = false;
		}

		// return;
	});

	onDestroy(async () => {
		// await onDocumentUpdateStore?.unlisten();
		// $actions = [];
	});

	async function add(descriptor: IComponentDescriptor, insertTop: boolean = false) {
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
		await tick();
		scrollToBottom();
	}

	function onAction({ detail }: any) {
		// console.log(detail);
		if (!detail.cmd) {
			showError('No command defined');
			return;
		}
		const cmd = detail.cmd;

		console.log({ cmd });
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
							if (refresh) {
								dispatch('removeItem', { tabId: documentId, refresh: true });

								// window.history.back();
							}
						}
					};
				});
				break;
			case 'link':
				if (!cmd.args) {
					showError('No arguments provided for inlineViewer. No action will be taken');
					return;
				}
				goto(cmd.args.path || '');
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

	$: $sideQuickActions = {
		component: RightPanel,
		props: {
			showActions,
			actions: meta.actions,
			otherActions: meta.otherActions,
			status: meta.status,
			feeds: meta.feeds,
			// on:click:{onAction}
			documentId,
			click: onAction
		},
		title: 'Actions',
		show: true
	};

	onDestroy(() => {
		$sideQuickActions = {} as ISideMenu;
	});
</script>

{#if busy}
	<div class="pt-10">
		<PageLoader size={50} />
	</div>
{:else}
	<div class="h-full flex flex-col w-full" in:slide>
		<div class="flex-grow shadow-lgx flex bg-gray-100x xborder-1 w-full h-full">
			<!-- add p-2 to the class -->
			<ScrollArea otherClasses="flex-grow rounded-lg p-2  h-full w-full">
				<div class="loginbox">
					<Canvas
						bind:scrollingDiv
						children={elements}
						on:close={closeAComponent}
						on:toggleCollapse={toggleCollapse}
						on:removeItem
					/>
				</div>
				<div class="h-16" />
			</ScrollArea>
			<div class="hidden h-full flex-grow" class:lg:block={$hideRightDrawer}>
				<RightPanel
					{showActions}
					actions={meta.actions}
					otherActions={meta.otherActions}
					status={meta.status}
					on:click={onAction}
					{documentId}
				/>
			</div>
		</div>
	</div>
{/if}
