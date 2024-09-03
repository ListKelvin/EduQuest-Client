import { Card, CardBody } from "@nextui-org/react";
import { ReactNode } from "react";

export default function BaseChart({
	children,
	height,
}: {
	children: ReactNode;
	height?: number;
}) {
	return (
		<Card className=" w-full p-0 h-full" style={height ? { height } : {}}>
			<CardBody className="p-0">
				<div className="relative w-full h-full">
					<div className="absolute w-full h-full 	bg-[url(https://www.tremor.so/grid.svg)] opacity-20 bg-repeat" />
					<div className="relative w-full h-full flex flex-col">
						{children}
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
