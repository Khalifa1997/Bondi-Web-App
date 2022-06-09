import {
  Iorder,
  IorderPagination,
  orderFilterStateType,
  orderStateType
} from "@/store/order/state";

import { GetterTree } from "vuex";
import { rootState } from "..";

export enum OrderGetters {
  GET_ALL_ORDERS = "GET_ALL_ORDERS",
  GET_SELECTED_ORDER = "GET_SELECTED_ORDER",
  GET_SELECTED_ORDER_DEVICE = "GET_SELECTED_ORDER_DEVICE",
  GET_SET_OF_ORDERS = "GET_SET_OF_ORDERS",
  GET_PAGINATION = "GET_PAGINATION",
  GET_ORDER_FILTER_ITEMS = "GET_ORDER_FILTER_ITEMS",
  GET_LOADING = "GET_LOADING",
  GET_ERRORS = "GET_ERRORS"
}
type OrderGetterTree = GetterTree<orderStateType, rootState>;

const getters: OrderGetterTree = {
  [OrderGetters.GET_PAGINATION]: (state: orderStateType): IorderPagination => {
    if (!state.pagenation) {
      return { pageno: 1, maxRecordsPerPage: 10 };
    }
    return state.pagenation;
  },
  // return a sub set of orders for tables based on pagination
  [OrderGetters.GET_SET_OF_ORDERS]: (
    state: orderStateType
  ): { data: Iorder[]; total: number } => {
    const filtered = state.items.filter((v: Iorder) => {
      const s: string[] = Object.keys(v);

      return !s.some((k: string) => {
        if (!state.filters[k] || !state.filters[k].length) {
          return false;
        }
        if (!state.filters[k].includes(eval(`v.${k}`))) {
          return true;
        } else {
          return false;
        }
      });
    });
    if (
      !state.pagenation ||
      (filtered.length && filtered.length < state.pagenation.maxRecordsPerPage)
    ) {
      return { data: filtered, total: filtered.length };
    }

    const start = state.pagenation.pageno * state.pagenation.maxRecordsPerPage;
    const end = start + state.pagenation.maxRecordsPerPage;

    //  return data according to the pagination

    // const sliced = filtered.slice(start, end); //uncomment this if you want to use pagination
    const sliced = filtered.slice(0, end); // scrolling

    return { data: sliced, total: filtered.length };
  },
  [OrderGetters.GET_ALL_ORDERS]: (state: orderStateType): Iorder[] => {
    return state.items;
  },
  [OrderGetters.GET_SELECTED_ORDER]: (state: orderStateType) => {
    return state.selectedItem;
  },
  [OrderGetters.GET_SELECTED_ORDER_DEVICE]: (state: orderStateType) => {
    return state.selectedOrderDevice;
  },
  [OrderGetters.GET_ORDER_FILTER_ITEMS]: (
    state: orderStateType
  ): orderFilterStateType => {
    return state.filters;
  },
  [OrderGetters.GET_LOADING]: (state: orderStateType): boolean => {
    return state.loading;
  },
  [OrderGetters.GET_ERRORS]: (state: orderStateType) => {
    return [];
  }
};

export type orderGetters = typeof getters;

export default getters;
