<template>
  <div :class="GET_ERRORS.length === 0 ? `modal` : ``">
    <error-modal
      v-if="GET_ERRORS.length > 0 || this.orderErrors.length > 0"
      @clicked="clearErrors"
      v-scroll-lock="GET_ERRORS.length > 0 || this.orderErrors.length > 0"
    />
    <div v-else class="modal__container" v-click-outside="modalClose">
      <!--Title-->
      <div class="modal__title">
        <p class="modal__title__text">{{ title }}</p>
      </div>
      <!--Body-->
      <transition name="fade">
        <div v-if="Order" class="modal__order">
          <div class="modal__card__container">
            <card
              :header="selectedProduct.displayName"
              title="CPE"
              class="modal__card"
            >
              <template v-slot:img>
                <img
                  class="modal__card__img"
                  :src="
                    require(`@/assets/${
                      selectedManufacturer === 1
                        ? `test`
                        : selectedProduct.displayName
                    }.png`)
                  "
              /></template>

              <template v-slot:company>
                <img
                  class="modal__card__company"
                  :src="require('@/assets/cisco.jpg')"
              /></template>
              <template v-slot:price>
                <p class="modal__card__price">$ 43000</p>
              </template>
              <template v-slot:label>
                <Label v-if="title" :title="title" class="modal__card__label" />
              </template>
            </card>
          </div>
          <div class="modal__input__container">
            <Input
              :inputLabel="`Hostname`"
              :inputType="`text`"
              :inputPlaceholder="`NSWCPE0005`"
              class="modal__input__first"
              @input="editText($event)"
            />
            <p class="text-danger" v-if="inputError">
              Enter a correct hostname.<br />
              Must not contain Special Characters
            </p>
            <h1 class="input__label input__label--light">
              Site
            </h1>

            <select
              name="sites"
              id="sites"
              class="modal__input__second"
              v-model="selectedSite"
            >
              <option
                v-for="site in GET_ALL_SITES"
                :key="site.id"
                :value="site.name"
                class="modal__input__second__option mx-4 text-textPrimary "
                >{{ site.name }}</option
              >
            </select>
            <primary-button
              class="modal__primary__button  button--light"
              :loading="this.orderLoading"
              :ButtonName="
                this.orderLoading ? `This will take a moment` : `Order Device`
              "
              @click.native="submitOrder"
            />
          </div>
        </div>
      </transition>
      <div class="modal__grid" v-if="!Order">
        <div class="modal__manufacturer">
          <div @click="setManufacturer(1)" class="modal__manufacturer__logo">
            <img
              v-if="selectedManufacturer === 1"
              src="@/assets/cisco-enabled.svg"
            />
            <img v-else src="@/assets/cisco-disabled.svg" />
          </div>
          <div @click="setManufacturer(2)" class="modal__manufacturer__logo">
            <img
              v-if="selectedManufacturer === 2"
              src="@/assets/juniper-enabled.svg"
            />
            <img v-else src="@/assets/juniper-disabled.svg" />
          </div>
          <div @click="setManufacturer(3)" class="modal__manufacturer__logo">
            <img
              v-if="selectedManufacturer === 3"
              src="@/assets/fortinet-enabled.svg"
            />
            <img v-else src="@/assets/fortinet-disabled.svg" />
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <div
            :key="selectedManufacturer"
            v-if="selectedManufacturer === 1"
            :class="{
              modal__grid__one: cisco.length === 1,
              modal__grid__two: cisco.length === 2,
              modal__grid__twoPlus: cisco.length > 2
            }"
          >
            <card
              :header="n.displayName"
              title="CPE"
              v-for="n in cisco"
              :key="`one` + n.id"
              class="modal__grid__card"
              isModalCard
              @click.native="orderStart(n)"
            >
              <template v-slot:img>
                <img
                  class="modal__grid__card__img"
                  :src="require('@/assets/test.png')"
              /></template>

              <template v-slot:company>
                <img
                  class="modal__grid__card__company"
                  :src="require('@/assets/cisco.jpg')"
              /></template>
              <template v-slot:price>
                <p class="modal__grid__card__price">$ 43000</p>
              </template>
              <template v-slot:label>
                <Label
                  v-if="title"
                  :title="title"
                  class="modal__grid__card__label"
                />
              </template>
            </card>
          </div>

          <div
            :key="selectedManufacturer"
            v-else-if="selectedManufacturer === 2"
            :class="{
              modal__grid__one: juniper.length === 1,
              modal__grid__two: juniper.length === 2,
              modal__grid__twoPlus: juniper.length > 2
            }"
          >
            <card
              :header="n.displayName"
              title="CPE"
              v-for="n in juniper"
              :key="`two` + n.id"
              class="modal__grid__card"
              isModalCard
              @click.native="orderStart(n)"
            >
              <template v-slot:img>
                <img
                  class="modal__grid__card__img"
                  :src="require(`@/assets/${n.displayName}.png`)"
              /></template>

              <template v-slot:price>
                <p class="modal__grid__card__price">$ 43000</p>
              </template>
              <template v-slot:label>
                <Label
                  v-if="title"
                  :title="title"
                  class="modal__grid__card__label"
                />
              </template>
            </card>
          </div>

          <div
            :key="selectedManufacturer"
            v-else
            :class="{
              modal__grid__one: fortinet.length === 1,
              modal__grid__two: fortinet.length === 2,
              modal__grid__twoPlus: fortinet.length > 2
            }"
          >
            <card
              :header="n.displayName"
              title="CPE"
              v-for="n in fortinet"
              :key="`three` + n.id"
              class="modal__grid__card"
              isModalCard
              @click.native="orderStart(n)"
            >
              <template v-slot:img>
                <img
                  class="modal__grid__card__img"
                  :src="require('@/assets/Fortinet D900.png')"
              /></template>

              <template v-slot:price>
                <p class="modal__grid__card__price">$ 43000</p>
              </template>
              <template v-slot:label>
                <Label
                  v-if="title"
                  :title="title"
                  class="modal__grid__card__label"
                />
              </template>
            </card>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";
import Input from "@/components/Input.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { DeviceModelDto } from "@/api/models";
import { Icons } from "@/IconPaths";
import { ROUTES } from "@/router/routes";
import { Modules } from "@/store";
import { mapGetters } from "vuex";
import { OrderActions } from "@/store/order/actions";
import { OrderGetters } from "@/store/order/getters";
import ErrorModal from "./ErrorModal.vue";
import { DeviceActions } from "@/store/device/actions";
import { DeviceGetters } from "@/store/device/getters";

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
  components: {
    Card,
    Input,
    PrimaryButton,
    ErrorModal
  },
  data() {
    return {
      ROUTES,
      Icons,
      inputError: false,
      selectedManufacturer: 1,

      selectedProduct: {
        displayName: "",
        id: -1,
        name: "",
        vendor: ""
      },
      selectedHostname: "",
      selectedSite: "",

      cisco: [] as Array<DeviceModelDto>,
      juniper: [] as Array<DeviceModelDto>,
      fortinet: [] as Array<DeviceModelDto>
    };
  },
  created() {
    this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_MODELS}`);

    this.GET_MODELS.forEach((element: DeviceModelDto) => {
      switch (element.vendor) {
        case "Cisco":
          this.cisco.push(element);
          break;
        case "Juniper":
          this.juniper.push(element);
          break;
        case "Fortinet":
          this.fortinet.push(element);
          break;
        default:
          break;
      }
    });

    this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_SITES}`);
    this.selectedSite = this.GET_ALL_SITES[0].name;
  },

  watch: {
    orderLoading(newValue) {
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
    }
  },
  methods: {
    editText(event: string) {
      this.inputError = false;
      this.selectedHostname = event;
      const errors = new RegExp(`^[a-zA-Z0-9_]*$`);
      if (!errors.test(event)) this.inputError = true;
    },
    clearErrors() {
      this.$store.dispatch(`${Modules.ORDERS}/${OrderActions.RESET_ERRORS}`);
      this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.RESET_ERRORS}`);

      this.$emit("clicked");
    },
    submitOrder() {
      if (!this.inputError) {
        const modelName = this.selectedProduct.displayName.substring(
          this.selectedProduct.displayName.indexOf(" ") + 1
        );
        this.$store.dispatch(`${Modules.ORDERS}/${OrderActions.ADD}`, {
          hostname: this.selectedHostname,
          model: modelName,
          site: this.selectedSite,
          vendor: this.selectedProduct.vendor
        });
      }
    },
    setManufacturer(x: number) {
      this.selectedManufacturer = x;
    },
    modalClose() {
      if (!this.GET_LOADING && !this.orderLoading) this.$emit("clicked");
    },
    orderStart(n: any) {
      this.selectedManufacturer =
        ["Cisco", "Juniper", "Fortinet"].indexOf(n.vendor) + 1;
      this.selectedProduct = n;
      this.$emit("orderStart");
    }
  },
  props: {
    title: {
      type: String,
      default: "Choose the right device for you"
    },
    Order: {
      type: Boolean
    },
    items: {
      type: Number,
      default: 4
    }
  },
  computed: {
    ...mapGetters(Modules.ORDERS, {
      orderErrors: OrderGetters.GET_ERRORS,
      orderLoading: OrderGetters.GET_LOADING
    }),
    ...mapGetters(Modules.DEVICE, [
      DeviceGetters.GET_ERRORS,
      DeviceGetters.GET_LOADING,
      DeviceGetters.GET_ALL_SITES,
      DeviceGetters.GET_MODELS
    ])
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
