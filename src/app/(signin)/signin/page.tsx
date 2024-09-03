"use client";

import { useLoginMutation, useProfileQuery } from "@/gql/graphql";
import { useAuth } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import toast from "react-hot-toast";

export default function Page() {
	const router = useRouter();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login] = useLoginMutation({
		onError(error, clientOptions) {
			toast.error(
				<div className=" flex flex-col gap-2">
					<p className=" text-sm font-medium text-foreground-700">
						Lỗi đăng nhập
					</p>
					<p className=" font-semibold text-foreground-900">
						Tên đăng nhập hoặc mật khẩu không đúng
					</p>
				</div>
			);
		},
	});
	const { authData, isLogin, authLogin } = useAuth();
	const { data, loading } = useProfileQuery({ fetchPolicy: "network-only" });

	const handleSignIn = useCallback(async () => {
		const res = await login({ variables: { username, password } });
		console.log(res);
		if (res.data?.login) {
			authLogin(res.data.login);
			router.push("/");
		}
	}, [login, username, password, authLogin, router]);

	// useEffect(() => {
	// 	if (!!getCookie("isLogin") == true) {
	// 		router.replace("/");
	// 	}
	// }, [isLogin, router]);

	useEffect(() => {
		if (loading === false && data) {
			router.replace("/");
		}
	}, [data, loading, router]);

	return (
		<>
			<div className=" flex-1 grid place-items-center">
				<div className=" flex flex-col items-center gap-10">
					<h1 className=" font-semibold text-xl">
						Đăng nhập vào hệ thống
					</h1>
					<form
						className=" w-unit-6xl max-w-3xl flex flex-col gap-4"
						onSubmit={(e) => {
							e.preventDefault();
							handleSignIn();
						}}
						autoComplete="on"
					>
						<div className=" flex flex-col gap-2">
							<label
								className=" text-sm font-medium"
								htmlFor="username"
							>
								Tên đăng nhập
							</label>
							<input
								className=" border-1 rounded-lg py-1 px-2"
								id="username"
								type="text"
								role="username"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className=" flex flex-col gap-2">
							<label
								className=" text-sm font-medium"
								htmlFor="password"
							>
								Mật khẩu
							</label>
							<input
								className=" border-1 rounded-lg py-1 px-2"
								id="password"
								type="password"
								name="password"
								role="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							type="submit"
							className=" mt-4 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 duration-200 p-2 rounded-lg"
						>
							<p className=" text-sm font-medium text-white">
								Đăng nhập
							</p>
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
