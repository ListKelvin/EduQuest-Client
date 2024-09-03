type IFeature = {
	title: string;
	description?: string;
	getUrl: (variables: any) => string;
};

export const FEATURE_OBJ: { [key: string]: IFeature } = {
	searchSubject: {
		title: "Tìm kiếm môn học",
		description: "",
		getUrl: () => `/subject`,
	},
};

export const FEATURES = Array.from(Object.entries(FEATURE_OBJ)).map(
	([key, value]) => ({ key, ...value })
);
