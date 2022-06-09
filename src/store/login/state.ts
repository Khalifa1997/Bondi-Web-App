// normal order attr
export interface Iuser {
  id: string;
  name: string;
  email: string;
  token: string;

  [key: string]: unknown;
}

interface UserAccountPermissions {
  CanOrderDevice: boolean;
  CanManageOrder: boolean;
}
export interface UserAccount {
  username: string;
  password: string;
  name: string;
  initials: string;
  initialsStyle?: string;
  permissions: UserAccountPermissions;
}

// the bigger state to be used in app

export type loginStateType = { user: UserAccount; errorMessages: string[] };

// default
const state = (): loginStateType => ({
  user: {} as UserAccount,
  errorMessages: [] as string[]
});

export default state;
