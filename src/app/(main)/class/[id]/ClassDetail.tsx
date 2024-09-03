"use client";

import TextLink from "@/components/TextLink";
import { Class } from "@/gql/graphql";
import { DeepPartial } from "@apollo/client/utilities";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";

type IProps = {
	className?: string;
} & DeepPartial<Class>;

export default function ClassDetail({ className, ...classInfo }: IProps) {
	return (
		<div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
			<Table
				hideHeader
				color="default"
				className={className}
				aria-label="Class information"
			>
				<TableHeader>
					<TableColumn>Tên</TableColumn>
					<TableColumn>Giá trị</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Môn</TableCell>
						<TableCell>
							<TextLink
								href={`/subject/${classInfo.subject?.subject_id}`}
							>
								{classInfo.subject?.display_name}
							</TextLink>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Khoa</TableCell>
						<TableCell>
							<TextLink
								href={`/faculty/${classInfo.subject?.faculty?.faculty_id}`}
							>
								{classInfo.subject?.faculty?.display_name}
							</TextLink>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Học kỳ</TableCell>
						<TableCell>
							<p className=" font-medium">
								{classInfo.semester?.display_name}
							</p>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<Table
				hideHeader
				color="default"
				className={className}
				aria-label="Class information"
			>
				<TableHeader>
					<TableColumn>Tên</TableColumn>
					<TableColumn>Giá trị</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Tham gia</TableCell>
						<TableCell>
							<p className=" font-medium text-zinc-500 dark:text-zinc-400">
								{classInfo.participating_student}
							</p>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Tổng số học sinh</TableCell>
						<TableCell>
							<p className=" font-medium">{classInfo.total_student}</p>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Loại lớp</TableCell>
						<TableCell>{classInfo.class_type}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
