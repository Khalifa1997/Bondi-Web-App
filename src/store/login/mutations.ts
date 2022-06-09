import { loginStateType, UserAccount } from "@/store/login/state";
import { MutationTree } from "vuex";

export enum LoginMutations {
  SET_USERLOGIN_FROM_API = "SET_USERLOGIN_FROM_API",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  SET_USER_LOGOUT = "SET_USER_LOGOUT"
}

type LoginMutationTree = MutationTree<loginStateType>;

const mutations: LoginMutationTree = {
  [LoginMutations.SET_USERLOGIN_FROM_API]: (
    state: loginStateType,
    payload: UserAccount
  ) => {
    state.user = payload;
  },
  [LoginMutations.SET_USER_LOGOUT]: (
    state: loginStateType,
    payload: unknown
  ) => {
    state.user = payload as UserAccount;
  }
};

export default mutations;
