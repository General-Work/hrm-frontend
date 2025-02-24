<script lang="ts" context="module">
	import { setMapper } from '$cmps/canvas/ComponentRenderer.svelte';

	const map: Record<string, ConstructorOfATypedSvelteComponent> = {
		appointementDetailsForm: AppointmentDetails,
		appointEditor: AppointEditor,
		postingEditor: PostingEditor,
		postingDetailsForm: Postings,
		interviewOverview: InterviewOverview
	};

	function textToComponent(typeName: string): ConstructorOfATypedSvelteComponent {
		return map[typeName] || null;
	}

	function initMappers() {
		setMapper(textToComponent);
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment';

	import { goto } from '$app/navigation';

	import type { IComponentDescriptor } from '$cmps/canvas/types';

	import Box from '$cmps/ui/box.svelte';
	import type { IButtonConfig } from '$cmps/ui/cardButton.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import RightPanel from '$cmps/ui/rightPanel.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import StaffHeader from '$cmps/ui/staffHeader.svelte';
	import { hideRightDrawer, modalConfig, sideQuickActions } from '$data/appStore';
	import { getRecordsActions, type IViewerUsage } from '$lib/requestMetaData';
	import type { DocumentStatus, ISideMenu, IStaffByID, IStaffHeader } from '$lib/types';
	import { showError } from '$lib/utils';
	import { readStaffById } from '$svc/staff';
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { ulid } from 'ulid';
	import Canvas from '$cmps/canvas/index.svelte';
	import Postings from '$modules/staffrecords/postings.svelte';
	import AppointmentDetails from '$modules/staffrecords/appointmentDetails.svelte';
	import AppointEditor from '$modules/staffrecords/partials/appointEditor.svelte';
	import PostingEditor from '$modules/staffrecords/partials/postingEditor.svelte';
	import InterviewOverview from '$routes/(private)/(aux)/interview-session/interviewOverview.svelte';

	initMappers(); // set the component mappers

	export let data;
	export let staffId = '';
	export let viewerUsage: IViewerUsage;
	let staffHeaderData = {} as IStaffHeader;
	let documentStaus: DocumentStatus = 'PENDING';
	let staff = {} as IStaffByID;
	let busy = true;
	let actions: any[] = [];
	let supportDocuments: any[] = [];
	let elements: IComponentDescriptor[] = [];
	let document: any = { actions: [], otherActions: [] };
	let scrollingDiv: HTMLElement = {} as HTMLElement;

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
							if (refresh && browser) {
								window.history.back();
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

	onMount(async () => {
		try {
			const [staffRes] = await Promise.all([readStaffById(staffId)]);
			if (staffRes.success) {
				// console.log(ret.data);
				const data = staffRes.data as IStaffByID;
				staffHeaderData = {
					passportPicture: data.passportPicture || '',
					fullName: `${data.title} ${data.firstName} ${data.lastName} ${data.otherNames ?? ''}`,
					status: `${data.status}`,
					staffId: data.staffIdentificationNumber || '-',
					directorate: data.directorate?.directorateName || '-',
					department: data.department?.departmentName || '-',
					unit: data.unit?.unitName || '-',
					email: data.email || '-',
					phone: data.phone || '-'
				};
				staff = data;
				console.log({ staff });
				// documentStaus = staffHeaderData.status as DocumentStatus;

				const { actions: x, supportingDocuments: y } = getRecordsActions(
					staff.currentAppointment ? true : false,
					staff.staffPosting ? true : false,
					staff.staffIdentificationNumber,
					viewerUsage
				);
				actions = x;
				supportDocuments = y;
			}
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			busy = false;
		}
	});
</script>

{#if busy}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:else}
	<div class=" w-full h-full flex gap-4 overflow-hidden custom-container" in:slide>
		<section class=" flex-grow flex flex-col gap-3 h-full">
			<div class="p-1 w-full">
				<StaffHeader data={staffHeaderData} />
			</div>
			<!-- <div class=" px-1 w-full h-full overflow-y-hidden">
				<Box otherClasses="p-4 w-full h-full" shadow rounded bgWhite>
					hhi
					<slot />
				</Box>
			</div> -->
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
		</section>
		<div class="h-full bg-gray-200 w-0.5 pb-10 hidden lg:block" />
		<aside class="hidden w-[19rem] shrink-0" class:lg:block={$hideRightDrawer}>
			<RightPanel showActionLabel {actions} {supportDocuments} on:click={onAction} />
		</aside>
	</div>
{/if}
