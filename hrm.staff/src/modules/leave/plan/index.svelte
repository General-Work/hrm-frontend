<script lang="ts" context="module">
	export const ctxKey = {};
	export type IMember = {
		instructions: any;
		plan: any;
	};
	type IPersonalInfo = {
		type: 'instructions';
		data: any;
	};
	type IAttachments = {
		type: 'plan';
		data: any;
	};

	export type IMessage = IPersonalInfo | IAttachments;
</script>

<script lang="ts">
	import HorizontalStepper, { type IStepper } from '$cmps/ui/horizontalStepper.svelte';
	import { setContext } from 'svelte';
	import Editor from './editor.svelte';
	import Instructions from './instructions.svelte';
	import { writable, type Writable } from 'svelte/store';

	let steps: IStepper[] = [
		{
			label: 'Instructions',
			icon: 'f7:person-fill',
			id: 1,
			component: Instructions
			// props: { data: $member.personalInfo }
		},
		{
			label: 'Leave Plan',
			icon: 'mdi:certificate',
			id: 2,
			component: Editor
			// props: { data: $member.attachments }
		}
	];
	let isActiveStep = 0;
	let member: Writable<IMember> = writable<IMember>();
	setContext(ctxKey, member);

	function onMessage({ detail }: any): void {
		const step: IStepper = detail.step;
		const message: IMessage = detail.message;
		// console.log(detail);
		switch (message.type) {
			case 'instructions':
				isActiveStep++;
				break;

			default:
				break;
		}
	}
</script>

<div class="w-full h-full">
	<HorizontalStepper
		{steps}
		on:message={onMessage}
		bind:isActiveStep
		nextText={isActiveStep === 1 ? 'Submit' : 'Next'}
	/>
</div>
