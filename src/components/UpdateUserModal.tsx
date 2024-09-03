"use client";

import { ROLE_DESCRIPTION_ENUM, ROLE_ENUM } from "@/constants/role";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import {
	Role,
	useRemoveUserMutation,
	UserEntity,
	useUpdateUserMutation,
} from "@/gql/graphql";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FacultySelector from "./selectors/FacultySelector";

type Props = {
	user?: Partial<UserEntity>;
	isOpen: boolean;
	onOpenChange: () => any;
	refetch?: () => any;
};

function UpdateUserModalInner({ refetch, isOpen, onOpenChange, user }: Props) {
	const { faculty, setFaculty } = useFilter();

	const [displayName, setDisplayName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [role, setRole] = useState<Role>();
	const [password, setPassword] = useState<string>("");
	const [password2, setPassword2] = useState<string>("");

	const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

	const [mutate] = useUpdateUserMutation();
	const [removeUser] = useRemoveUserMutation();

	const handleAddUser = useCallback(
		async (callback: () => any) => {
			// if (password !== password2) {
			// 	setIsPasswordMatch(false);
			// 	toast.error("Mật khẩu không khớp");
			// 	return;
			// }
			// if (!role) {
			// 	toast.error("Bạn phải chọn vai trò của tài khoản");
			// 	return;
			// }
			try {
				const promise = mutate({
					variables: {
						user: {
							id: user?.id || "",
							displayName,
							facultyId: faculty?.faculty_id,
							role,
						},
					},
				});
				await toast.promise(promise, {
					loading: "Đang tạo tài khoản...",
					success: "Tạo tài khoản thành công",
					error: "Tên đăng nhập đã tồn tại",
				});
				refetch?.();
				callback?.();
			} catch (error) {}
		},
		[displayName, faculty?.faculty_id, mutate, refetch, role, user?.id]
	);

	useEffect(() => {
		if (!isPasswordMatch && password === password2) {
			setIsPasswordMatch(true);
		}
	}, [isPasswordMatch, password, password2]);

	useEffect(() => {
		if (isOpen && user) {
			setDisplayName(user.displayName || "");
			// setUsername(user.username || "");
			// setPassword("");
			// setPassword2("");
			if (user.role) setRole(user.role);
			if (user.faculty) setFaculty(user.faculty);
			setIsPasswordMatch(true);
		}
	}, [isOpen, setFaculty, user, user?.displayName, user?.username]);

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleAddUser(onClose);
						}}
					>
						<ModalHeader className="flex flex-col gap-1 text-foreground-900">
							Cập nhật tài khoản
						</ModalHeader>
						<ModalBody>
							<div className=" flex flex-col gap-4">
								<Input
									value={displayName}
									onChange={(e) => setDisplayName(e.target.value)}
									label="Tên hiển thị"
									labelPlacement="inside"
									required
									isRequired
								/>
								{/* <Input
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									label="Tên đăng nhập"
									labelPlacement="inside"
									required
									isRequired
								/> */}
								<Select
									label="Vai trò"
									placeholder="Chọn vai trò cho tài khoản"
									className=" w-full"
									selectedKeys={role ? new Set([role]) : undefined}
									onSelectionChange={(value) =>
										value !== "all"
											? setRole(
													value.values().next()
														.value as Role
											  )
											: null
									}
								>
									{Array.from(Object.values(Role)).map((role) => (
										<SelectItem
											key={role}
											textValue={ROLE_ENUM[role]}
										>
											<div className=" py-1 flex flex-col gap-1">
												<p className=" font-semibold text-foreground-900">
													{ROLE_ENUM[role]}
												</p>
												<p className=" whitespace-pre-wrap text-foreground-600">
													{ROLE_DESCRIPTION_ENUM[role]}
												</p>
											</div>
										</SelectItem>
									))}
								</Select>
								{role == Role.Faculty ? <FacultySelector /> : null}
								{/* <div className=" mt-4 flex flex-col gap-4 ">
									<p className=" font-semibold text-foreground-800">
										Cài đặt mật khẩu
									</p>
									<Input
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										type="password"
										label="Mật khẩu"
										labelPlacement="inside"
										required
										isRequired
									/>
									<Input
										value={password2}
										onChange={(e) =>
											setPassword2(e.target.value)
										}
										type="password"
										color={
											isPasswordMatch ? undefined : "danger"
										}
										label="Xác nhận mật khẩu"
										labelPlacement="inside"
										required
										isRequired
									/>
								</div> */}
							</div>
						</ModalBody>
						<ModalFooter>
							<div className=" flex-1 flex justify-between">
								<Button
									color={"danger"}
									variant={"solid"}
									onPress={async () => {
										if (user?.id) {
											const promise = removeUser({
												variables: { id: user.id || "" },
											});
											toast.promise(promise, {
												loading: "Đang xóa tài khoản...",
												success: "Xóa tài khoản thành công",
												error: "Xóa tài khoản thất bại",
											});
										}
										refetch?.();
										onClose();
									}}
								>
									Xóa tài khoản
								</Button>
								<div className=" flex gap-4">
									<Button
										color={"default"}
										variant="light"
										onPress={onClose}
									>
										Hủy
									</Button>
									<Button color="primary" type="submit">
										<p className=" font-semibold">Cập nhật</p>
									</Button>
								</div>
							</div>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
}

export default function UpdateUserModal(props: Props) {
	return (
		<FilterProvider>
			<UpdateUserModalInner {...props} />
		</FilterProvider>
	);
}
