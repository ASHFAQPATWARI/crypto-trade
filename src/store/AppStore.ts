import { IAppStore } from "model/IAppStore";
import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create<IAppStore>(
  devtools(
    (set) => ({
      username: "",
      isAuthenticated: false,
      assets: ["bitcoin"],
      signin: (name) =>
        set(
          (state) => {
            state.username = name;
            state.isAuthenticated = true;
          },
          false,
          "signin"
        ),
      signout: () => {
        set(
          (state) => {
            state.isAuthenticated = false;
          },
          false,
          "signout"
        );
      },
    }),
    { name: "MainStore" }
  )
);

export default useStore;
