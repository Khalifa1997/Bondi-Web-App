<template>
  <div class="search">
    <transition name="fade">
      <modal
        :items="6"
        @clicked="closeModal"
        v-if="modal"
        :Order="Order"
        v-scroll-lock="modal"
        @orderStart="Order = !Order"
      />
    </transition>

    <div class="searchBar" :style="modal ? fadeStyle : null">
      <span class="searchBar__search__icon">
        <img src="@/assets/SearchIcon.svg" />
      </span>

      <input
        type="search"
        name=""
        placeholder="Search"
        @keyup.enter="searchDevice($event)"
        class="searchBar__input"
      />

      <span class="searchBar__separator"></span>

      <span class="searchBar__avatar">
        <img src="@/assets/avatar.svg" />
      </span>

      <p class="searchBar__name">
        {{ localize("hi", "lang-en") }}
        {{ this.GET_USER_LOGIN.user ? this.GET_USER_LOGIN.user.name : `` }}
      </p>
    </div>
    <primary-button
      class="searchBar__button button--light"
      ButtonName="Order Device"
      @click.native="openModal"
      :style="modal ? fadeStyle : null"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import localize from "@/localization/languages";
import Modal from "@/components/Modal.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import VScrollLock from "v-scroll-lock";
import { LoginGetters } from "@/store/login/getters";
import { createNamespacedHelpers } from "vuex";
import { Modules } from "@/store";
import { DeviceActions } from "@/store/device/actions";
import { ROUTES } from "@/router/routes";

const { mapGetters } = createNamespacedHelpers(Modules.LOGIN);

Vue.use(VScrollLock);

export default Vue.extend({
  components: {
    PrimaryButton,
    Modal
  },
  data: function() {
    return {
      localize,
      modal: false,
      Order: false,
      fadeStyle: {
        filter: "blur(7px)"
      }
    };
  },
  methods: {
    searchDevice(event: any) {
      this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_ALL}`, {
        search: event.target.value
      });
      if (this.$route.path !== ROUTES.DEVICES)
        this.$router.push(ROUTES.DEVICES);
    },
    closeModal() {
      if (this.modal) {
        this.$emit("modalOpen", false);

        this.modal = false;
        this.Order = false;
      }
    },
    openModal() {
      this.$emit("modalOpen", true);
      this.modal = !this.modal;
    }
  },
  computed: {
    ...mapGetters([LoginGetters.GET_USER_LOGIN])
  }
});
</script>
<style scoped>
input,
input::-webkit-input-placeholder {
  font-size: 12px;
  line-height: 14px;
}

input::-webkit-search-cancel-button {
  display: none;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
