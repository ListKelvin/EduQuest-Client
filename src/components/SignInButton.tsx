"use client";

import { signInFunction } from "@/server-actions/signin";

export default function SignInButton() {
	return (
		<button
			onClick={async (e) => {
				signInFunction();
			}}
		>
			Signin
		</button>
	);
}
