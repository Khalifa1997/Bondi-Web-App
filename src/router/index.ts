import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import DevicesList from "@/pages/DevicesList.vue";
import Dashboard from "@/pages/Dashboard.vue";
import DeviceDetails from "@/pages/DeviceDetails.vue";
import ForgetPasswordEmail from "@/pages/ForgetPasswordEmail.vue";
import NewPassword from "@/pages/NewPassword.vue";
import NotFound404 from "@/pages/fallback/NotFound404.vue";
import UnAuthorizedAccess401 from "@/pages/fallback/UnAuthorizedAccess401.vue";
import ComingSoon from "@/pages/ComingSoon.vue";
import ForgetPasswordNumber from "@/pages/ForgetPasswordNumber.vue";
import { ROUTES } from "@/router/routes";
import Orders from "@/pages/OrdersList.vue";
import OrderDetails from "@/pages/OrderDetails.vue";
import Login from "@/pages/Login.vue";

import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: ROUTES.DASHBOARD,
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: ROUTES.LOGIN,
    name: "Login",
    component: Login
  },
  {
    path: ROUTES.FORGET_PASSWORD_EMAIL,
    name: "Forget Password Email",
    component: ForgetPasswordEmail
  },
  {
    path: ROUTES.FORGET_PASSWORD_NUMBER,
    name: "Forget Password Code",
    component: ForgetPasswordNumber
  },
  {
    path: ROUTES.NEW_PASSWORD,
    name: "New Password",
    component: NewPassword
  },
  {
    path: ROUTES.DEVICES,
    name: "Devices",
    component: DevicesList
  },
  {
    path: ROUTES.ORDERS,
    name: "Orders",
    component: Orders
  },
  {
    path: ROUTES.DEVICE_DETAILS,
    name: "Device Details",
    component: DeviceDetails
  },
  {
    path: ROUTES.ORDER_DETAILS,
    name: "Order Details",
    component: OrderDetails
  },
  {
    path: ROUTES.ACCESS_DENIED,
    name: "Access Denied",
    component: UnAuthorizedAccess401
  },
  {
    path: ROUTES.COMING_SOON,
    name: "Coming Soon",
    component: ComingSoon
  },
  {
    path: "*",
    name: "Page Not Found",
    component: NotFound404
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});
router.beforeEach((to, from, next) => {
  // if the route is not public
  const isAuth = store.getters["LOGIN/GET_USER_AUTHENTICATION"];

  const protectedRoutes = routes
    .map(a => a.name)
    .filter(function(item: any) {
      return (
        [
          "Login",
          "New Password",
          "Forget Password Email",
          "Forget Password Code"
        ].indexOf(item) === -1
      );
    });

  if (
    to.name &&
    [
      "Login",
      "New Password",
      "Forget Password Email",
      "Forget Password Code"
    ].includes(to.name) &&
    isAuth
  ) {
    // Redirect user to homepage
    return next({ path: ROUTES.DASHBOARD });
  }
  if (to.name && protectedRoutes.includes(to.name) && !isAuth) {
    return next({ path: ROUTES.ACCESS_DENIED });
  }
  // Let the user pass
  return next();
});

export default router;
