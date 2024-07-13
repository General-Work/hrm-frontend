import type { Actions } from '@sveltejs/kit';
import { signIn } from '$svc/authentication';
export const actions: Actions = { default: signIn };
