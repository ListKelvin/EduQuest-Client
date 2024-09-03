"use client";

import { ROLE_DESCRIPTION_ENUM, ROLE_ENUM } from "@/constants/role";
import { Lecturer, Role, useRegisterUserMutation } from "@/gql/graphql";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FacultySelector from "./selectors/FacultySelector";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import LecturerSelector from "./LecturerSelector";

type Props = {
	refetch?: () => any;
};

function AddUserButtonInner({ refetch }: Props) {
	const { faculty } = useFilter();

	const [displayName, setDisplayName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [role, setRole] = useState<Role>();
	const [lecturer, setLecturer] = useState<Partial<Lecturer>>();
	const [password, setPassword] = useState<string>("");
	const [password2, setPassword2] = useState<string>("");

	const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [mutate] = useRegisterUserMutation();

	const handleAddUser = useCallback(
		async (callback: () => any) => {
			if (password !== password2) {
				setIsPasswordMatch(false);
				toast.error("Mật khẩu không khớp");
				return;
			}
			if (!role) {
				toast.error("Bạn phải chọn vai trò của tài khoản");
				return;
			}
			try {
				const promise = mutate({
					variables: {
						user: {
							displayName,
							username,
							facultyId: faculty?.faculty_id || undefined,
							lecturerId: lecturer?.lecturer_id,
							role,
							password,
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
		[
			displayName,
			faculty?.faculty_id,
			mutate,
			password,
			password2,
			refetch,
			role,
			username,
		]
	);

	useEffect(() => {
		if (!isPasswordMatch && password === password2) {
			setIsPasswordMatch(true);
		}
	}, [isPasswordMatch, password, password2]);

	useEffect(() => {
		if (!isOpen) {
			setDisplayName("");
			setUsername("");
			setPassword("");
			setPassword2("");
			setRole(undefined);
			setIsPasswordMatch(true);
		}
	}, [isOpen]);

	return (
		<div>
			<Button onClick={onOpen} variant={"flat"}>
				<p className=" font-semibold">Thêm tài khoản</p>
			</Button>
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
								Tạo tài khoản mới
							</ModalHeader>
							<ModalBody>
								<div className=" flex flex-col gap-4">
									<Select
										label="Vai trò"
										placeholder="Chọn vai trò cho tài khoản"
										className=" w-full"
										selectedKeys={
											role ? new Set([role]) : undefined
										}
										onSelectionChange={(value) => {
											const role =
												value !== "all"
													? (value.values().next()
															.value as Role)
													: null;
											if (role) setRole(role);
										}}
									>
										{Array.from(Object.values(Role)).map(
											(role) => (
												<SelectItem
													key={role}
													textValue={ROLE_ENUM[role]}
												>
													<div className=" py-1 flex flex-col gap-1">
														<p className=" font-semibold text-foreground-900">
															{ROLE_ENUM[role]}
														</p>
														<p className=" whitespace-pre-wrap text-foreground-600">
															{
																ROLE_DESCRIPTION_ENUM[
																	role
																]
															}
														</p>
													</div>
												</SelectItem>
											)
										)}
									</Select>
									{role == Role.Faculty ? (
										<FacultySelector />
									) : role == Role.Lecturer ? (
										<LecturerSelector
											lecturer={lecturer}
											setLecturer={(lecturer) => {
												if (lecturer) {
													setDisplayName(
														lecturer.display_name || ""
													);
												}
												setLecturer(lecturer);
											}}
										/>
									) : null}
									<Input
										value={displayName}
										onChange={(e) =>
											setDisplayName(e.target.value)
										}
										label="Tên hiển thị"
										labelPlacement="inside"
										required
										isRequired
									/>
									<Input
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										label="Tên đăng nhập"
										labelPlacement="inside"
										required
										isRequired
									/>

									<div className=" mt-4 flex flex-col gap-4 ">
										<p className=" font-semibold text-foreground-800">
											Cài đặt mật khẩu
										</p>
										<Input
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
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
												isPasswordMatch
													? undefined
													: "danger"
											}
											label="Xác nhận mật khẩu"
											labelPlacement="inside"
											required
											isRequired
										/>
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="default"
									variant="light"
									onPress={onClose}
								>
									Hủy
								</Button>
								<Button color="primary" type="submit">
									<p className=" font-semibold">Tạo tài khoản</p>
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}

export default function AddUserButton(props: Props) {
	return (
		<FilterProvider>
			<AddUserButtonInner {...props} />
		</FilterProvider>
	);
}
