import type { IButtonConfig } from '$cmps/ui/cardButton.svelte';
import type { DocumentStatus } from './types';

export function getRecordsActions(
	actions: IButtonConfig[],
	isApplicant: boolean,
	status: DocumentStatus
) {
	let buttons: IButtonConfig[] = [];
	console.log(status)
	if (isApplicant) {
		if (status === 'APPROVED') {
			buttons = [actions[0]];
		} else if (status === 'APPOINTED') {
			buttons = [actions[1]];
		} else {
			buttons = [];
		}
	} else {
		buttons = actions;
	}
	return buttons;
}
