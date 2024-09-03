"use client";

import { useAuth } from "@/stores/auth.store";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const router = useRouter();
	const { authLogout } = useAuth();

	useEffect(() => {
		authLogout();
		deleteCookie("isLogin");
		router.push("/signin");
	}, [authLogout, router]);

	return <></>;
}
