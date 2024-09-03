import { ONLINE_CRITERIA } from "@/constants/criteria";

export function criteriaFilter(data, query) {
	return (
		data?.criterias?.data?.filter?.((v) => {
			if (
				query.class_type === "TH2" &&
				v.type.some((d) => d.class_type === "TH2")
			)
				return true;
			if (ONLINE_CRITERIA.includes(v.display_name?.trim?.()))
				if (query.class_type === "Online") return true;
				else return false;
			let maxType = null;
			v.type.forEach((d) => {
				if (!maxType) maxType = d;
				else if (maxType.num < d.num) maxType = d;
			});
			if (query.class_type === "" || query.class_type === "All") return true;
			return maxType.class_type === query.class_type;
		}) || []
	);
}
