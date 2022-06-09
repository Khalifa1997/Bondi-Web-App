import { axios } from "./config";
import {
  Iorder,
  IorderDeliveryDetailsPayload,
  IorderDevicePayload,
  IorderCompletePayload,
  IorderShippingPayload
} from "@/store/order/state";
import { Idevice } from "@/store/device/state";

export default {
  async getOrders(): Promise<Iorder[]> {
    return [
      {
        completed: true,
        createdAt: "27-2-2022",
        deviceHostname: "Host A",
        deviceSite: "Site 1",
        id: 0,
        status: "Shipped",
        delivered: true,
        shipped: true
      },
      {
        completed: true,
        createdAt: "27-2-2022",
        deviceHostname: "Host B",
        deviceSite: "Site 2",
        id: 1,
        status: "Planned",
        delivered: false,
        shipped: false
      },
      {
        completed: true,
        createdAt: "27-2-2022",
        deviceHostname: "Host C",
        deviceSite: "Site 1",
        id: 2,
        status: "Delivered",
        delivered: true,
        shipped: true
      }
    ];
  },
  async getOrderDevice(orderId: number): Promise<Idevice> {
    const rndInt = Math.floor(Math.random() * 5) + 1;
    let status = "";
    switch (rndInt) {
      case 1:
        status = "Ordered";
        break;
      case 2:
        status = "Planned";
        break;
      case 3:
        status = "Shipped";
        break;
      case 4:
        status = "Delivered";
        break;

      default:
        status = "Provisioned";
        break;
    }
    const x: Idevice = {
      id: 0,
      hostname: "Host A",
      configurationAvailable: false,
      site: {
        id: 0,
        name: "Site A"
      },
      model: { displayName: "Cisco", id: 0, name: "Cisco", vendor: "Cisco" },
      order: {
        deviceSite: "Site A",
        completed: true,
        shipped: true,
        deliveryDate: new Date().toString(),
        createdAt: new Date().toString(),
        shipDate: new Date().toString(),
        delivered: true,
        id: 20,
        deviceHostname: "Host 1",
        status: status,
        shipTrackingUrl: ""
      },
      status: status,
      role: "string2",
      managementIpAddress: "129.23.21.1/123"
    };
    return x;
  },
  async addOrder(orderPayload: IorderDevicePayload): Promise<Idevice> {
    const response = await axios.post(`/api/orders`, orderPayload);

    return response.status === 200 ? response.data : null;
  },
  async addOrderComplete(
    orderId: number,
    payload: IorderCompletePayload
  ): Promise<Idevice> {
    const response = await axios.post(
      `/api/orders/${orderId}/complete`,
      payload
    );

    return response.status === 200 ? response.data : ({} as Idevice);
  },
  async addOrderDeliviery(
    orderId: number,
    payload: IorderDeliveryDetailsPayload
  ): Promise<Iorder> {
    const response = await axios.post(
      `/api/orders/${orderId}/delivery`,
      payload
    );

    return response.status === 200 ? response.data : ({} as Iorder);
  },
  async addOrderShipping(
    orderId: number,
    orderShippingPayload: IorderShippingPayload
  ): Promise<Iorder> {
    const response = await axios.post(
      `/api/orders/${orderId}/shipping`,
      orderShippingPayload
    );

    return response.status === 200 ? response.data : ({} as Iorder);
  }
};
