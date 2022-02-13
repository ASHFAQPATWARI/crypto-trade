import { IAppStore } from "model/IAppStore";
import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create<IAppStore>(
  devtools(
    (set) => ({
      username: "",
      isAuthenticated: false,
      showLogin: false,
      assets: ["bitcoin"],
      signin: () =>
        set(
          (state) => {
            state.isAuthenticated = true;
            state.setShowLogin(false);
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
      setShowLogin: (show) => {
        set(
          (state) => {
            state.showLogin = show;
          },
          false,
          "setShowLogin"
        );
      },
    }),
    { name: "MainStore" }
  )
);

export default useStore;
