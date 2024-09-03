import { AuthDto } from "@/gql/graphql";
import { DeepPartial } from "@apollo/client/utilities";
import { setCookie } from "cookies-next";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type IAuth = {
	isLogin?: boolean;
	authData: DeepPartial<AuthDto> | null;
	authLogin: (authEntity: DeepPartial<AuthDto>) => any;
	authLogout: () => any;
};

export const useAuth = create<
	IAuth,
	[["zustand/persist", never], ["zustand/immer", never]]
>(
	persist(
		immer<IAuth>((set, get) => ({
			authData: null,
			isLogin: false,
			authLogin(authEntity) {
				set((state) => {
					state.isLogin = true;
					state.authData = authEntity;
					setCookie("isLogin", true);
				});
			},
			authLogout() {
				set((state) => {
					state.isLogin = false;
					state.authData = null;
				});
			},
		})),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
