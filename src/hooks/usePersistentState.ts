import {
	useState,
	useEffect,
	SetStateAction,
	Dispatch,
	useLayoutEffect,
} from "react";

export default function usePersistentState<T>(
	name: string,
	defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
	const [data, setData] = useState<T>(defaultValue);

	useLayoutEffect(() => {
		const value = localStorage.getItem(name);
		setData(value != null ? JSON.parse(value) : defaultValue);
	}, [defaultValue, name]);

	useEffect(() => {
		if (data) localStorage.setItem(name, JSON.stringify(data));
	}, [data, name]);

	return [data, setData];
}
