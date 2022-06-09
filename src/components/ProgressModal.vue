<template>
  <div class="progressModal">
    <div
      class="progressModal__container"
      v-click-outside="closeModal"
      :style="index === 2 ? `height: 28rem` : ``"
    >
      <h1 class="progressModal__header">
        {{ title }}
      </h1>
      <p class="progressModal__text">
        {{ description }}
      </p>
      <input
        v-model="firstFieldText"
        v-if="[1, 2].includes(index)"
        type="date"
        id="date"
        name="date"
        class=" progressModal__input__first progressModal__date-picker"
      />
      <Input
        v-else
        class="progressModal__input__first"
        :inputPlaceholder="firstField"
        @input="firstFieldText = $event"
      />
      <p class="progressModal__error" v-if="firstFieldError.length > 0">
        {{ firstFieldError }}
      </p>
      <Input
        v-if="index != 2"
        class="progressModal__input__second"
        :inputPlaceholder="secondField"
        :isMask="index === 3 ? true : false"
        @input="secondFieldText = $event"
      />
      <p class="progressModal__error" v-if="secondFieldError.length > 0">
        {{ secondFieldError }}
      </p>
      <primary-button
        class="button--light progressModal__button"
        :loading="loading"
        :ButtonName="loading ? `This will take a moment` : buttonName"
        @click.native="submitProgressChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import localize from "@/localization/languages";
import Input from "@/components/Input.vue";
import { mapGetters } from "vuex";
import { Modules } from "@/store";
import { OrderGetters } from "@/store/order/getters";
import { OrderActions } from "@/store/order/actions";

Vue.directive("click-outside", {
  bind(el: any, binding: any, vnode: any) {
    const vm = vnode.context;
    const callback = binding.value;
    el.clickOutsideEvent = function(event: any) {
      if (!(el == event.target || el.contains(event.target))) {
        return callback.call(vm, event);
      }
    };

    document.body.addEventListener("click", el.clickOutsideEvent, true);
  },
  unbind(el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent, true);
  }
});

export default Vue.extend({
  data() {
    return {
      localize,
      firstFieldText: "" as string,
      secondFieldText: "" as string,
      firstFieldError: "" as string,
      secondFieldError: "" as string
    };
  },
  props: {
    site: {
      type: String,
      required: true
    },
    orderID: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    title(): string {
      switch (this.index) {
        case 1:
          return "Preparing Order";
        case 3:
          return "Installation in Progress";
        default:
          return "Preparing Order";
      }
    },
    ...mapGetters(Modules.ORDERS, {
      loading: OrderGetters.GET_LOADING
    }),
    description(): string {
      switch (this.index) {
        case 1:
          return "Shipping Information will be available soon";
        case 3:
          return `Your device will soon be installed at the “${this.site}” site`;
        default:
          return "Delivery Information will be available soon";
      }
    },
    firstField(): string {
      switch (this.index) {
        case 1:
          return "Shipping Date";
        case 3:
          return "Device Serial Number";
        default:
          return "Delivery Date";
      }
    },
    secondField(): string {
      switch (this.index) {
        case 1:
          return "Tracking URL (Optional)";
        case 3:
          return "Device Management MAC Address";
        default:
          return "Tracking URL (Optional)";
      }
    },
    buttonName(): string {
      switch (this.index) {
        case 1:
          return "Mark as Shipped";
        case 3:
          return "Provision Device";
        default:
          return "Mark as Delivered";
      }
    }
  },
  components: { Input, PrimaryButton },
  methods: {
    closeModal() {
      if (!this.loading) this.$emit("clicked");
    },
    async submitProgressChange() {
      let endpoint = "";
      this.firstFieldError = "";
      this.secondFieldError = "";
      const payload: { [k: string]: unknown } = {};
      const macRegex = new RegExp(`^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$`);
      const urlRegex = new RegExp(
        //eslint-disable-next-line
        `(http|ftp|https)://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?`
      );
      payload["orderId"] = this.orderID;
      const noww = new Date();
      switch (this.index) {
        case 1: {
          endpoint = OrderActions.ADD_ORDER_SHIPPING;
          const x = new Date(this.firstFieldText);
          if (x < noww) {
            this.firstFieldError =
              "Invalid Date, please Enter a date in the future";
            return;
          }
          let trackingUrl = "";
          const shipDate = x.toISOString();
          if (this.secondFieldText.trim().length > 0) {
            if (!urlRegex.test(this.secondFieldText)) {
              this.secondFieldError = "Invalid URL";
              return;
            }
            trackingUrl = this.secondFieldText;
          }
          payload["data"] = {
            shipDate: shipDate,
            ...(trackingUrl.length > 0 && { trackingUrl: trackingUrl })
          };

          break;
        }
        case 3:
          endpoint = OrderActions.ADD_ORDER_COMPLETE;
          if (!macRegex.test(this.secondFieldText)) {
            this.secondFieldError = "Invalid Mac Address";
            return;
          }
          if (
            this.firstFieldText.indexOf(" ") > 0 ||
            !this.firstFieldText ||
            this.firstFieldText.trim().length === 0
          ) {
            this.firstFieldError =
              "Enter a valid Serial Number, Must not contain Spaces";
            return;
          }
          payload["data"] = {
            deviceSerialNumber: this.firstFieldText,
            deviceMacAddress: this.secondFieldText
          };
          break;
        default: {
          endpoint = OrderActions.ADD_ORDER_DELIVERY;
          const x = new Date(this.firstFieldText);
          if (x < noww) {
            this.firstFieldError =
              "Invalid Date, please Enter a date in the future";
            return;
          }
          payload["data"] = { deliveryDate: x.toISOString() };
          break;
        }
      }
      console.log(payload);
      this.$store.dispatch(`${Modules.ORDERS}/${endpoint}`, payload);
    }
  },
  watch: {
    loading(newValue, oldValue) {
      window.onbeforeunload = null;
      if (newValue)
        window.onbeforeunload = (event: any) => {
          const e = event || window.event;
          // Cancel the event
          e.preventDefault();
          if (e) {
            e.returnValue = ""; // Legacy method for cross browser support
          }
          return ""; // Legacy method for cross browser support
        };

      if (newValue === false && oldValue === true) this.closeModal();
    }
  }
});
</script>
