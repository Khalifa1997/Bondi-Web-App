import {
  OrderDeliveryDetailsCreateDto,
  OrderDto,
  OrderProvisioningCreateDto,
  OrderShippingDetailsCreateDto,
  DeviceOrderCreateDto
} from "@/api/models";
import { Idevice } from "../device/state";

// normal order attr
type NA = "N/A";

export type Iorder = OrderDto;
export type IorderDeliveryDetailsPayload = OrderDeliveryDetailsCreateDto;
export type IorderCompletePayload = OrderProvisioningCreateDto;
export type IorderShippingPayload = OrderShippingDetailsCreateDto;
export type IorderDevicePayload = DeviceOrderCreateDto;

export interface IorderPagination {
  pageno: number;
  maxRecordsPerPage: number;
}

export type orderFilterStateType = {
  [key: string]: unknown[];
};

// the bigger state to be used in app
export type orderStateType = {
  items: Iorder[];
  selectedItem: Iorder;
  selectedOrderDevice: Idevice;
  loading: boolean;
  pagenation: IorderPagination;
  filters: orderFilterStateType;
  errors: { [key: string]: unknown }[];
};

// default state
const state = (): orderStateType => ({
  items: [],
  filters: {},
  loading: false,
  pagenation: { pageno: 1, maxRecordsPerPage: 5 },
  selectedItem: {} as Iorder,
  selectedOrderDevice: {} as Idevice,
  errors: []
});

export default state;
