import {
	HOME_INTRODUCTION,
	IFeatureIntroduction,
} from "@/constants/home_introduction";
import { toSearchString } from "./unaccent";

export function searchFeature(
	keyword_: string
): IFeatureIntroduction["navigation_links"] {
	const keyword = toSearchString(keyword_);

	const features: IFeatureIntroduction["navigation_links"] = [];

	HOME_INTRODUCTION.forEach((tab) => {
		tab.navigation_links.forEach(({ displayName, description, link }) => {
			const regex1 = new RegExp(
				`${toSearchString(displayName)}|${toSearchString(description)}`,
				"ig"
			);
			const regex2 = new RegExp(`\\s${keyword}|^${keyword}`, "ig");
			if (
				// keyword.match(regex1) ||
				toSearchString(displayName).match(regex2) ||
				toSearchString(description)?.match(regex2)
			) {
				features.push({ displayName, description, link });
			}
		});
	});

	return features;
}
