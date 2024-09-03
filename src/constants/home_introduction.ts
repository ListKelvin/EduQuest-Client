export const HOME_INTRODUCTION: IFeatureIntroduction[] = [
	{
		title: {
			displayName: "Môn học",
			link: "/subject",
		},
		description: "Khảo sát dựa vào điểm đánh giá trung bình của các môn học ",
		navigation_links: [
			{
				displayName: "Tìm kiếm môn học",
				description: "Tìm kiếm môn học theo tên, xem danh sách môn học",
				link: "/subject",
			},
			{
				displayName: "Xem bảng xếp hạng các môn học",
				description:
					"Xem danh sách môn học và điểm đánh giá của từng môn theo thứ tự giảm dần",
				link: "/subject/average-point",
			},
		],
	},
	{
		title: {
			displayName: "Bình luận",
			link: "/comment",
		},
		description: "Thống kê bình luận của sinh viên",
		navigation_links: [
			{
				displayName: "Xem tất cả bình luận",
				link: "/comment",
			},
		],
	},
	{
		title: {
			displayName: "Tiêu chí",
			link: "/criteria",
		},
		description: "Thống kê điểm đánh giá theo từng tiêu chí",
		navigation_links: [
			{
				displayName: "Xem danh sách tiêu chí",
				link: "/criteria",
			},
			{
				displayName: "Điểm đánh giá qua từng học kỳ",
				description:
					"Xem điểm đánh giá từng tiêu chí và điểm đánh giá tổng qua từng học kỳ",
				link: "/criteria/detail",
			},
		],
	},
];

export interface IFeatureIntroduction {
	title: {
		displayName: string;
		link: string;
	};
	description: string;
	navigation_links: {
		displayName: string;
		description?: string;
		link: string;
	}[];
}
