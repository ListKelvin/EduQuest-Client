"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";

import StringSkeleteton from "./StringSkeleteton";

export default function TableSketon({ lines = 3 }: { lines?: number }) {
	const cols = Array(5)
		.fill(0)
		.map((_, i) => ({ key: i, label: i }));
	const rows = Array(lines)
		.fill(0)
		.map((_, i) => ({ key: i }));

	return (
		<Table hideHeader aria-label="Example static collection table">
			<TableHeader columns={cols}>
				{(column) => <TableColumn>a</TableColumn>}
			</TableHeader>
			<TableBody items={rows}>
				{(item) => (
					<TableRow key={item.key}>
						<TableCell>
							<StringSkeleteton className="w-[500px]" />
						</TableCell>
						<TableCell>
							<StringSkeleteton
								from={100}
								to={100}
								className="w-[100px]"
							/>
						</TableCell>
						<TableCell>
							<StringSkeleteton
								from={100}
								to={100}
								className="w-[100px]"
							/>
						</TableCell>
						<TableCell>
							<StringSkeleteton
								from={100}
								to={100}
								className="w-[100px]"
							/>
						</TableCell>
						<TableCell>
							<StringSkeleteton
								from={100}
								to={100}
								className="w-[100px]"
							/>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
