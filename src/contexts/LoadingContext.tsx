import { createContext } from "react";

const LoadingContext = createContext<ILoading>({ isLoading: false });

interface ILoading {
	isLoading: boolean;
}
