import orderApi from "@/api/orders";
import { ActionContext, ActionTree } from "vuex";
import {
  Iorder,
  IorderPagination,
  orderStateType,
  IorderDevicePayload,
  IorderCompletePayload,
  IorderDeliveryDetailsPayload,
  IorderShippingPayload
} from "./state";
import { OrderMutations } from "./mutations";
import { rootState } from "@/store";
import router from "@/router";
import { ROUTES } from "@/router/routes";

export enum OrderActions {
  GET_ALL = "GET_ORDERS",
  GET_ORDER = "GET_ORDER",
  GET_ORDER_DEVICE = "GET_ORDER_DEVICE",

  ADD = "ADD_ORDER",
  ADD_ORDER_COMPLETE = "ADD_ORDER_COMPLETE",
  ADD_ORDER_DELIVERY = "ADD_ORDER_DELIVERY",
  ADD_ORDER_SHIPPING = "ADD_ORDER_SHIPPING",

  SET_PAGINATION = "SET_PAGINATION",
  SET_FILTERS = "SET_ORDER_FILTERS",

  RESET_ERRORS = "RESET_ERRORS",

  ATTACH = "ATTACH_ORDERS"
}

type OrderActionTree = ActionTree<orderStateType, rootState>;
type OrderAction = ActionContext<orderStateType, rootState>;

const actions: OrderActionTree = {
  [OrderActions.ATTACH]: (action: OrderAction, payload: undefined) => {
    action.commit(OrderMutations.SET_PAGINATION, {
      ...action.state.pagenation,
      pageno: action.state.pagenation.pageno + 1
    });
  },
  [OrderActions.RESET_ERRORS]: (action: OrderAction, payload: undefined) => {
    action.commit(OrderMutations.RESET_ERROR_MESSAGES, payload);
  },
  [OrderActions.GET_ALL]: (action: OrderAction, payload: undefined) => {
    action.commit(OrderMutations.SET_LOADING, true);
    orderApi
      .getOrders()
      .then(res => {
        action.commit(OrderMutations.SET_ORDERS_FROM_API, res, payload);
        action.commit(OrderMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(OrderMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(OrderMutations.SET_LOADING, false);
      });
    // action.commit(OrderMutations.SET_ORDER_FROM_API, payload);
  },
  [OrderActions.GET_ORDER]: (
    action: OrderAction,
    payload: { orderId: number }
  ) => {
    action.commit(OrderMutations.SET_LOADING, true);
    orderApi
      .getOrderDevice(payload.orderId)
      .then(res => {
        action.commit(OrderMutations.SET_SELECTED_ORDER_DEVICE, res);
        action.commit(
          OrderMutations.SET_SELECTED_ORDER,
          res.order ?? undefined
        );
        action.commit(OrderMutations.RESET_ERROR_MESSAGES);
        return res;
      })
      .catch(rej => {
        action.commit(OrderMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(OrderMutations.SET_LOADING, false);
      });
  },
  [OrderActions.ADD]: (action: OrderAction, payload: IorderDevicePayload) => {
    action.commit(OrderMutations.SET_LOADING, true);
    orderApi
      .addOrder(payload)
      .then(async response => {
        if (response) {
          await action.commit(OrderMutations.ADD_ORDER, payload);
          await action.commit(OrderMutations.RESET_ERROR_MESSAGES);
          await action.commit(
            OrderMutations.SET_SELECTED_ORDER,
            response.order
          );
          await action.commit(
            OrderMutations.SET_SELECTED_ORDER_DEVICE,
            response
          );
          await setTimeout(() => {
            return;
          }, 2000);
          if (response && response.order)
            await router.push(
              ROUTES.ORDER_DETAILS_BASE + "/" + response.order.id
            );
        } else {
          action.commit(OrderMutations.SET_ERROR_MESSAGE, "Error");
        }
      })
      .catch(rej => {
        action.commit(OrderMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(OrderMutations.SET_LOADING, false);
      });
  },
  [OrderActions.SET_PAGINATION]: (
    action: OrderAction,
    payload: IorderPagination
  ) => {
    action.commit(OrderMutations.SET_PAGINATION, payload);
  },
  [OrderActions.ADD_ORDER_COMPLETE]: (
    action: OrderAction,
    payload: { orderId: number; data: IorderCompletePayload }
  ) => {
    action.commit(OrderMutations.SET_LOADING, true);
    orderApi
      .addOrderComplete(payload.orderId, payload.data)
      .then(res => {
        action.commit(OrderMutations.SET_SELECTED_ORDER_DEVICE, res);
        action.commit(OrderMutations.SET_SELECTED_ORDER, res.order);
        action.commit(OrderMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(OrderMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(OrderMutations.SET_LOADING, false);
      });
  },
  [OrderActions.ADD_ORDER_DELIVERY]: (
    action: OrderAction,
    payload: { orderId: number; data: IorderDeliveryDetailsPayload }
  ) => {
    action.commit(OrderMutations.SET_LOADING, true);
    orderApi
      .addOrderDeliviery(payload.orderId, payload.data)
      .then(res => {
        action.commit(OrderMutations.SET_SELECTED_ORDER, res);
        action.commit(OrderMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(OrderMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(OrderMutations.SET_LOADING, false);
      });
  },
  [OrderActions.ADD_ORDER_SHIPPING]: (
    action: OrderAction,
    payload: { orderId: number; data: IorderShippingPayload }
  ) => {
    action.commit(OrderMutations.SET_LOADING, true);
    orderApi
      .addOrderShipping(payload.orderId, payload.data)
      .then(res => {
        action.commit(OrderMutations.SET_SELECTED_ORDER, res);
        action.commit(OrderMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(OrderMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(OrderMutations.SET_LOADING, false);
      });
  },
  [OrderActions.SET_FILTERS]: (
    action: OrderAction,
    payload: { value: string; field: string }
  ) => {
    action.commit(OrderMutations.SET_FILTERS, payload);
  }
};

export default actions;
