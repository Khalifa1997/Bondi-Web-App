import { loginStateType } from "@/store/login/state";
import { GetterTree } from "vuex";
import { rootState } from "..";

export enum LoginGetters {
  GET_USER_LOGIN = "GET_USER_LOGIN",
  GET_USER_AUTHENTICATION = "GET_USER_AUTHENTICATION",
  GET_USER_PERMISSIONS = "GET_USER_PERMISSIONS",
  GET_USER_INITALS = "GET_USER_INITALS",
  GET_ERRORS = "GET_ERRORS"
}
type LoginGetterTree = GetterTree<loginStateType, rootState>;

const getters: LoginGetterTree = {
  [LoginGetters.GET_USER_LOGIN]: (state: loginStateType): loginStateType => {
    return state;
  },
  [LoginGetters.GET_USER_AUTHENTICATION]: (state: loginStateType): boolean => {
    return state.user && state.user.username && state.user.password
      ? true
      : false;
  },
  [LoginGetters.GET_USER_PERMISSIONS]: (state: loginStateType) => {
    return state.user ? state.user.permissions : {};
  },
  [LoginGetters.GET_USER_INITALS]: (state: loginStateType) => {
    return state.user ? state.user.initials : "";
  },
  [LoginGetters.GET_ERRORS]: (state: loginStateType): string[] => {
    return [];
  }
};

export type loginGetters = typeof getters;

export default getters;
