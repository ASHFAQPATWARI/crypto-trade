export interface IAppStore {
  isAuthenticated: boolean;
  showLogin: boolean;
  assets: [string];
  signin: () => void;
  signout: () => void;
  setShowLogin: (show: boolean) => void;
}
