export interface IAppStore {
  username: string;
  isAuthenticated: boolean;
  assets: [string];
  signin: (name: string) => void;
  signout: () => void;
}
