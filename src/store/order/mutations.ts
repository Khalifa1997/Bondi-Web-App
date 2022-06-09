import { Iorder, IorderPagination, orderStateType } from "@/store/order/state";
import { MutationTree } from "vuex";
import { Idevice } from "../device/state";

export enum OrderMutations {
  ADD_ORDER = "ADD_ORDER",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  SET_ORDERS_FROM_API = "SET_ORDERS_FROM_API",
  SET_PAGINATION = "SET_PAGINATION",
  SET_FILTERS = "SET_FILTERS",
  SET_SELECTED_ORDER = "SET_SELECTED_ORDER",
  SET_SELECTED_ORDER_DEVICE = "SET_SELECTED_ORDER_DEVICE",
  SET_LOADING = "SET_LOADING",
  RESET_ERROR_MESSAGES = "RESET_ERROR_MESSAGES"
}

type OrderMutationTree = MutationTree<orderStateType>;

const mutations: OrderMutationTree = {
  [OrderMutations.ADD_ORDER]: (state: orderStateType, payload: Iorder) => {
    state.items.push(payload);
  },
  [OrderMutations.RESET_ERROR_MESSAGES]: (
    state: orderStateType,
    payload: undefined
  ) => {
    state.errors = [];
  },
  [OrderMutations.SET_ERROR_MESSAGE]: (
    state: orderStateType,
    payload: unknown
  ) => {
    state.errors.push(payload as any);
  },
  [OrderMutations.SET_ORDERS_FROM_API]: (
    state: orderStateType,
    payload: Iorder[]
  ) => {
    state.items = [...payload];
  },
  [OrderMutations.SET_PAGINATION]: (
    state: orderStateType,
    payload: IorderPagination
  ) => {
    state.pagenation = { ...payload };
  },
  [OrderMutations.SET_FILTERS]: (
    state: orderStateType,
    payload: { value: string; field: string }
  ) => {
    // there is no such filter so add it
    if (!state.filters[payload.field]) {
      state.filters = { ...state.filters, [payload.field]: [payload.value] };
      return;
    }

    // there is afilter but has nothing so add on its filter values
    // there is a filter and has a values but the value isnt in list so add it also
    if (
      !state.filters[payload.field].length ||
      !state.filters[payload.field].includes(payload.value)
    ) {
      state.filters[payload.field] = [
        ...state.filters[payload.field],
        payload.value
      ];
      return;
    }

    // none of the cases aboce so its in values so toggle it by removing the value

    const index = state.filters[payload.field].findIndex(
      (v: unknown) => v === payload.value
    );

    state.filters[payload.field] = ([] as unknown[]).concat(
      state.filters[payload.field].slice(0, index),
      state.filters[payload.field].slice(
        index + 1,
        state.filters[payload.field].length
      )
    );
  },
  [OrderMutations.SET_LOADING]: (state: orderStateType, payload: boolean) => {
    state.loading = payload;
  },
  [OrderMutations.SET_SELECTED_ORDER_DEVICE]: (
    state: orderStateType,
    payload: Idevice
  ) => {
    state.selectedOrderDevice = payload;
  },
  [OrderMutations.SET_SELECTED_ORDER]: (
    state: orderStateType,
    payload: Iorder
  ) => {
    state.selectedItem = payload;
  }
};

export default mutations;
