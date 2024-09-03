"use client";

import AddLecturerUser from "@/components/AddLecturerUser";
import AddUserButton from "@/components/AddUserButton";
import UpdateUserModal from "@/components/UpdateUserModal";
import { ROLE_ENUM } from "@/constants/role";
import {
	Role,
	useProfileQuery,
	UserDto,
	UserEntity,
	useUsersQuery,
} from "@/gql/graphql";
import { timeDiffString } from "@/utils/timeDiff";
import {
	Input,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const tabs = [
	{
		link: "",
		title: "Trang chủ",
	},
	{
		link: "list",
		title: "Danh sách giảng viên",
	},
];

export default function Page() {
	const router = useRouter();

	const [keyword, setKeyword] = useState("");

	const { data, loading } = useProfileQuery({ fetchPolicy: "network-only" });
	const {
		data: usersData,
		loading: usersLoading,
		refetch,
	} = useUsersQuery({
		variables: { name: keyword },
		fetchPolicy: "network-only",
	});

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedUser, setSelectedUser] = useState<Partial<UserEntity>>();

	useEffect(() => {
		tabs.forEach(({ link }) => router.prefetch(`/lecturer/${link}`));
	}, [router]);

	useEffect(() => {
		if (!loading && data?.profile.role !== Role.Admin) {
			router.replace("/signin");
		}
	}, [data, loading, router]);

	return (
		<div className=" flex-1 flex flex-col gap-8">
			<div className=" flex justify-between items-center">
				<h1 className="font-semibold text-3xl">Quản lý tài khoản</h1>
				<div className=" flex gap-4">
					<AddLecturerUser />
					<AddUserButton refetch={refetch} />
				</div>
			</div>
			<div className=" flex flex-col gap-2">
				<h2 className=" font-semibold text-base">Danh sách tài khoản</h2>
				<Input
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					onClear={() => setKeyword("")}
					isClearable
					type="text"
					size="md"
					placeholder="Nhập tên tài khoản cần tìm..."
					variant="bordered"
					className="w-full"
				/>
				<Skeleton
					isLoaded={!usersLoading}
					className=" -mx-2 rounded-xl min-h-[400px] bg-background dark:bg-black"
					disableAnimation={false}
				>
					<div className=" w-full p-2">
						<Table aria-label="User table">
							<TableHeader>
								<TableColumn>TÊN HIỂN THỊ</TableColumn>
								<TableColumn>VAI TRÒ</TableColumn>
								<TableColumn>TÊN ĐĂNG NHẬP</TableColumn>
								<TableColumn>ĐĂNG NHẬP LẦN CUỐI</TableColumn>
							</TableHeader>
							<TableBody>
								{(usersData?.users || []).map(
									({
										displayName,
										role,
										username,
										id,
										lastAccess,
									}) => (
										<TableRow
											className=" hover:bg-foreground-100 cursor-pointer duration-100"
											onClick={() => {
												onOpen();
												setSelectedUser({
													id,
													displayName,
													role,
													username,
												});
											}}
											key={id}
										>
											<TableCell>
												<p className=" font-semibold">
													{displayName}
												</p>
											</TableCell>
											<TableCell>
												<p className=" font-semibold">
													{ROLE_ENUM[role]}
												</p>
											</TableCell>
											<TableCell>{username}</TableCell>
											<TableCell>
												{lastAccess
													? timeDiffString(lastAccess)
													: "Chưa từng đăng nhập trước đây"}
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</div>
				</Skeleton>
			</div>
			<UpdateUserModal
				user={selectedUser}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				refetch={refetch}
			/>
		</div>
	);
}
