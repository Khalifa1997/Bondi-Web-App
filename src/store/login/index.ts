import actions from "@/store/login/actions";
import state, { loginStateType } from "@/store/login/state";
import mutations from "@/store/login/mutations";
import getters from "@/store/login/getters";
import { Module } from "vuex";
import { rootState } from "..";

type LoginModuleTree = Module<loginStateType, rootState>;
const loginModule: LoginModuleTree = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default loginModule;
