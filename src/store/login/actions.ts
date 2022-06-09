import productApi from "@/api/login";
import { ActionContext, ActionTree } from "vuex";
import { loginStateType } from "./state";
import { LoginMutations } from "./mutations";
import { rootState } from "@/store";

export enum LoginActions {
  GET_USER_LOGIN = "GET_USER_LOGIN",
  SET_USER_LOGOUT = "SET_USER_LOGOUT"
}

type UserActionTree = ActionTree<loginStateType, rootState>;
type UserAction = ActionContext<loginStateType, rootState>;

const actions: UserActionTree = {
  [LoginActions.GET_USER_LOGIN]: (
    action: UserAction,
    payload: { email: string; password: string }
  ) => {
    productApi.Login(payload.email, payload.password).then(res => {
      action.commit(LoginMutations.SET_USERLOGIN_FROM_API, res);
      return;
    });
  },
  [LoginActions.SET_USER_LOGOUT]: (action: UserAction, payload: undefined) => {
    action.commit(LoginMutations.SET_USER_LOGOUT, payload);
  }
};

export default actions;
