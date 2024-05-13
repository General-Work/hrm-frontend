<script lang="ts" context="module">
	export interface IStepper {
		icon?: string;
		label?: string;
		size?: number;
		component?: any;
		props?: any;
		id: number;
	}
	export interface IHasProps {
		props: any;
	}
	export function instanceOfHasProps(obj: any): obj is IHasProps {
		return obj && 'props' in obj && obj.props;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button, { type ButtonColor } from './button.svelte';
	import ScrollArea from './scrollArea.svelte';

	export let steps: IStepper[];
	export let isActiveStep = 0;
	export let disabledEvenly = false;
	export let backButtonColor: ButtonColor = 'default';
	export let nextButtonColor: ButtonColor = 'primary';
	export let fullHeight = false;
	export let busy = false;

	export let nextText = 'Next';
	let props: Record<string, any> = {};
	let isValid = false;

	const dispatch = createEventDispatcher();
	let onMessage = (step: IStepper, message: any) => {
		if (instanceOfHasProps(message)) {
			props[steps[isActiveStep].id] = message.props;
		}
		dispatch('message', { step, message });
	};
</script>

<div class="w-full h-full flex flex-col gap-4 overflow-y-hidden">
	<ol
		class="flex items-center text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base"
	>
		{#each steps as { icon, label, size }, index}
			<li
				class="flex gap-1 items-center flex-col"
				class:text-teal-400={index < isActiveStep}
				class:text-blue-600={index === isActiveStep}
			>
				<div
					class=" rounded-full grid place-content-center p-2"
					class:bg-teal-400={index < isActiveStep}
					class:bg-blue-600={index === isActiveStep}
					class:text-white={index <= isActiveStep}
					class:bg-gray-200={index > isActiveStep}
				>
					<iconify-icon
						icon={index >= isActiveStep ? icon : 'iconamoon:check'}
						style="font-size: {size ?? 18}px;"
					/>
				</div>
				<span class="text-sm hidden sm:block lg:hidden xl:block whitespace-nowrap">{label}</span>
			</li>
			{#if index !== steps.length - 1}
				<div
					class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700 px-4"
					class:bg-teal-400={index < isActiveStep}
					class:bg-gray-400={index >= isActiveStep}
				/>
			{/if}
		{/each}
	</ol>
	<ScrollArea otherClasses="w-full flex-grow mb-4 pr-3 {fullHeight ? 'h-full' : ' h-full lg:h-96'}">
		<svelte:component
			this={steps[isActiveStep].component}
			active={true}
			{...props[steps[isActiveStep].id]}
			on:message={(e) => {
				onMessage(steps[isActiveStep], e.detail);
			}}
			bind:isValid
			bind:busy
		>
			<div class="pt-5 flex flex-col md:flex-row md:justify-end gap-3 pr-1">
				<Button
					on:click={() => {
						isActiveStep--;
						dispatch('onBack');
					}}
					label="Back"
					disabled={isActiveStep == 0 || busy}
					color={backButtonColor}
				/>
				<Button
					type="submit"
					disabled={isValid === false || busy}
					{busy}
					label={nextText}
					color={nextButtonColor}
				/>
			</div>
		</svelte:component>
	</ScrollArea>
</div>
