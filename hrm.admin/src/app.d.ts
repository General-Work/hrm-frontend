// See https://kit.svelte.dev/docs/types#app

import type { IUserInfo } from '$lib/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userId: number;
			user: IUserInfo | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
