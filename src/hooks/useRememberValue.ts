import { useRef } from "react";

// If the data is null, return the old one
// This hook is used to cached meta data
export function useRememberValue<T>(data: T | undefined) {
	const oldData = useRef<T>();

	if (data) {
		oldData.current = data;
	}

	return oldData.current;
}
