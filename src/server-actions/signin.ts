"use server";

import { signIn } from "@/auth/auth";

export async function signInFunction() {
	await signIn();
}
