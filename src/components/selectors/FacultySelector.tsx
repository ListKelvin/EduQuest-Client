"use client";

import { useFilter } from "@/contexts/FilterContext";
import { Faculty, useFacultiesQuery } from "@/gql/graphql";
import useNavigate from "@/hooks/useNavigate";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner,
	useDisclosure,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import OptionButton from "../OptionButton";

function FacultySelector_({
	faculty,
	setFaculty,
	data,
	isLoading,
	isNoBorder = false,
}: {
	faculty?: Faculty;
	setFaculty?: (d: Faculty) => any;
	data?: Faculty[];
	isLoading: boolean;
} & FacultySelectorPropTypes) {
	const { setSubjects } = useFilter();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const currentSelectedRef = useRef<any>();

	const hasValue = Boolean(faculty?.display_name);
	const buttonText = hasValue ? faculty?.display_name : "Chọn khoa";

	useEffect(() => {
		if (currentSelectedRef.current) {
			currentSelectedRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [isOpen]);

	useEffect(() => {
		setSubjects(new Map());
	}, [faculty, setSubjects]);

	return (
		<>
			<OptionButton
				onPress={onOpen}
				hasValue={hasValue}
				isNoBorder={isNoBorder}
			>
				{buttonText}
			</OptionButton>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior="inside"
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>
								<p>Chọn khoa</p>
							</ModalHeader>
							<ModalBody className="pb-8 pt-3">
								{data && !isLoading ? (
									[
										{
											display_name: "Chọn tất cả",
											faculty_id: "",
										},
										...data,
									].map(
										({
											display_name = "",
											faculty_id = "",
										}: Faculty) => (
											<Button
												ref={
													display_name ==
													faculty?.display_name
														? currentSelectedRef
														: null
												}
												onPress={() => {
													setFaculty?.({
														faculty_id,
														display_name,
													});
													onClose();
												}}
												variant={
													display_name ==
													faculty?.display_name
														? "shadow"
														: "flat"
												}
												color={
													display_name ==
													faculty?.display_name
														? "primary"
														: "default"
												}
												className={`py-5`}
												key={display_name}
											>
												<p className="font-medium">
													{display_name || "Tất cả"}
												</p>
											</Button>
										)
									)
								) : (
									<div className=" flex flex-row gap-3">
										<Spinner size="sm" />
										<p className=" text-sm font-medium">
											Đang tải
										</p>
									</div>
								)}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default function FacultySelector(props: FacultySelectorPropTypes) {
	const { faculty, setFaculty } = useFilter();

	const { data, loading } = useFacultiesQuery();

	return (
		<FacultySelector_
			faculty={faculty}
			setFaculty={setFaculty}
			data={data?.faculties.data}
			isLoading={loading}
			{...props}
		/>
	);
}

export function FacultySelectorWithSearchParams(props: FacultySelectorPropTypes) {
	const searchParams = useSearchParams();
	const navigate = useNavigate();

	const { data, loading } = useFacultiesQuery();

	const faculty = useMemo(() => {
		const facultyId = searchParams.get("faculty") || undefined;
		if (!facultyId) return undefined;
		return data?.faculties.data?.find((v) => v.faculty_id === facultyId);
	}, [searchParams, data]);

	const setFaculty = useCallback(
		(faculty: Faculty) => {
			navigate.replace({ faculty: faculty.faculty_id, subject_id: "" });
		},
		[navigate]
	);

	return (
		<FacultySelector_
			faculty={faculty}
			setFaculty={setFaculty}
			data={data?.faculties.data}
			isLoading={loading}
			{...props}
		/>
	);
}

type FacultySelectorPropTypes = {
	isNoBorder?: boolean;
};
