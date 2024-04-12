import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
  const userId = locals.userId;
  if (userId) {
    throw redirect(307, "/dashboard");
  }
}
