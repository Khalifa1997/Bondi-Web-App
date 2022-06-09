/**
 * RULES!!!!!!!
 * structure localize key = lang-LL ( ISO 639-1 )
 * keys : always start with small letters (camelCasing) ie orderDevice helloWorld
 * keys must be added in all provided languages in structure object with same name  ie "lang-en":{hello:'xxx'},"lang-ar":{hello:'yyy'}
 *
 * if you want to support a new language you should add its keys in function below for type checking and full functionality else it will throw errors
 * structure object shouldnt be edited in runtime
 * localize should only be used mostly a page files
 *
 * USAGE!!
 * importing "import localize from '@/localization/languages'" script should be ts
 * after importing should be initialized in data
 * @example data:function(){
 * return {
 * localize, a:'x',....
 * }}
 */

const structure = Object.freeze({
  "lang-en": {
    hello: "Hello World!",
    active: "Active",
    ordered: "Ordered",
    orderDevice: "Order Device",
    numberOfDevices: "Number Of Devices",
    servedSites: "Served Sites",
    newOrders: "New Orders",
    rateOfIncrease: "Rate of Increase",
    devicePerformance: "Device Performance",
    thisMonth: "this Month",
    users: "Users",
    welcomeHeader: "You are welcome with Bondi",
    //Side Bar
    dashboard: "Dashboard",
    ordering: "Ordering",
    orders: "Orders",
    devices: "Devices",
    reports: "Reports",
    sites: "Sites",
    serviceProvisioning: "Service Provisioning",
    analytics: "Analytics",
    managedLAN: "Managed LAN",
    security: "Security",
    accountSettings: "Account Settings",
    helpAndContact: "Help / Contact",
    logout: "Logout",
    //Order Details
    orderStatus: "Order Status",
    hostname: "Hostname",
    site: "Site",
    price: "Price",
    vendor: "Vendor Name",
    totalCost: "Total Cost",
    //Coming Soon
    WorkingOnIt:
      "We are currently working on it and it will be ready in the shortest time",
    ComingSoon: "Coming Soon",
    backToDashboard: "Back to Dashboard",
    //Action Modal
    delete: "Yes, Delete",
    deleteConfirm: "Are you sure you want to delete this order?",
    deleteConfirmParagraph:
      "If you delete this order ... you may not be able to restore it again ... and you may lose all of its order data. Are you sure you want to delete it?",
    decommission: "Decommission",
    decommissionConfirm: "Are you sure you want to  decommission this device?",
    decommissionConfirmParagraph:
      "you are about to decommission this device. this action cannot be undone. confirm.",
    //Login Pages
    forgetPassword: "Forget Password",
    sendCodeToEmail: "Don't worry, we'll send you a code to your email",
    send: "Send",
    backToLogin: "Back to Login",
    resend: "Resend",
    arrivesIn60: "It arrives in 60 seconds",
    enterEmailCode: "Enter the code that reached your email address",
    enterNewPassword: "Enter the New Password",
    reassignPassword: "Don't worry, just re-assign a new password",
    confirm: "Confirm",
    //
    prepareTheOrder: "Prepare The Order",
    statusProgress: "Status Progress",
    shippingTheOrder: "Shipping The Order",
    ipAddressErrorFormat:
      "Please enter Ip in Correct Format ie: 192.168.2.1/24",
    hi: "Hi",
    finished: "Finished",
    pending: "Pending",
    shipped: "Shipped",
    delivered: "Delivered",
    provisioned: "Provisioned",
    planned: "Planned",
    backToHome: "back to home",
    order: "Order",
    number: "Number",
    orderDetails: "Order Details",
    unauthorizedTitle: "Unauthorized  Access",
    unauthorizedDesc: "This page does not exist .. How did you get here?",
    accessDeniedTitle: "Access Denied",
    accessDeniedDesc:
      "You do not have access to this page. Therefore, entry is prohibited",

    notFoundTitle: "Something Is Wrong",
    notFoundDesc: "This page does not exist .. How did you get here?"
  }
});

export default function(
  key: keyof typeof structure["lang-en"],
  lang: keyof typeof structure
): string {
  return structure[lang][key];
}
