import { signOut } from '$svc/authentication';
import type { Actions } from '@sveltejs/kit';
export const actions: Actions = { default: signOut };
