<template>
  <div class="sideBar">
    <div class="sideBar__container">
      <div class="sideBar__logo">
        <router-link :to="ROUTES.DASHBOARD">
          <img :src="require(`@/assets/Asset.png`)" style="width: 140px" />
        </router-link>
      </div>

      <nav class="sideBar__nav">
        <router-link
          :to="ROUTES.DASHBOARD"
          class="sideBar__nav__first"
          :class="{
            sideBar__nav__first__text__selected: this.route == 'Dashboard'
          }"
        >
          <icon
            :name="Icons.DASHBOARD"
            :width="18"
            :height="18"
            class="sideBar__nav__icon"
            :fill="colorAttr('Dashboard')"
          />

          <p class="sideBar__nav__text">
            {{ localize("dashboard", "lang-en") }}
          </p>
          <icon
            :name="Icons.REFRESH"
            :width="16"
            :height="16"
            class="sideBar__nav__icon__refresh"
            @click.prevent="refresh"
            :fill="colorAttr('Dashboard')"
            v-if="
              route &&
                route.toUpperCase() ===
                  ROUTES.DASHBOARD.substring(1).toUpperCase()
            "
          />
        </router-link>
        <router-link :to="ROUTES.COMING_SOON" class="sideBar__nav__second">
          <icon :name="Icons.SITES" class="sideBar__nav__icon" fill="#BDBDBD" />

          <p class="sideBar__nav__text sideBar__nav__text__disabled">
            {{ localize("sites", "lang-en") }}
          </p>
        </router-link>
        <router-link
          :to="ROUTES.ORDERS"
          class="sideBar__nav__second"
          :class="{
            sideBar__nav__first__text__selected:
              this.route === 'Orders' || this.route === 'Order Details'
          }"
        >
          <icon
            :name="Icons.ORDER"
            class="sideBar__nav__icon"
            :fill="colorAttr(['Orders', 'Order Details'])"
          />

          <p class="sideBar__nav__text">
            {{ localize("orders", "lang-en") }}
          </p>
        </router-link>

        <router-link
          :to="ROUTES.DEVICES"
          class="sideBar__nav__second"
          :class="{
            sideBar__nav__first__text__selected:
              this.route === 'Devices' || this.route === 'Device Details'
          }"
        >
          <icon
            :name="Icons.DEVICES"
            class="sideBar__nav__icon"
            :fill="colorAttr(['Devices', 'Device Details'])"
          />

          <p class="sideBar__nav__text">
            {{ localize("devices", "lang-en") }}
          </p>
        </router-link>

        <router-link :to="ROUTES.COMING_SOON" class="sideBar__nav__second">
          <icon
            :name="Icons.REPORT"
            :width="18"
            :height="22"
            class="sideBar__nav__icon"
            fill="#BDBDBD"
          />

          <p class="sideBar__nav__text sideBar__nav__text__disabled">
            {{ localize("reports", "lang-en") }}
          </p>
        </router-link>

        <router-link :to="ROUTES.COMING_SOON" class="sideBar__nav__second">
          <icon
            :name="Icons.SERVICE"
            class="sideBar__nav__icon"
            fill="#BDBDBD"
          />

          <p class="sideBar__nav__text sideBar__nav__text__disabled">
            {{ localize("serviceProvisioning", "lang-en") }}
          </p>
        </router-link>

        <router-link :to="ROUTES.COMING_SOON" class="sideBar__nav__second">
          <icon
            :name="Icons.ANALYTICS"
            class="sideBar__nav__icon"
            fill="#BDBDBD"
          />

          <p class="sideBar__nav__text sideBar__nav__text__disabled">
            {{ localize("analytics", "lang-en") }}
          </p>
        </router-link>

        <router-link :to="ROUTES.COMING_SOON" class="sideBar__nav__second">
          <icon
            :name="Icons.SECURITY"
            :width="18"
            :height="22"
            class="sideBar__nav__icon"
            fill="#BDBDBD"
          />

          <p class="sideBar__nav__text sideBar__nav__text__disabled">
            {{ localize("security", "lang-en") }}
          </p>
        </router-link>
        <router-link :to="ROUTES.COMING_SOON" class="sideBar__nav__second">
          <icon :name="Icons.LAN" class="sideBar__nav__icon" fill="#BDBDBD" />

          <p class="sideBar__nav__text sideBar__nav__text__disabled">
            {{ localize("managedLAN", "lang-en") }}
          </p>
        </router-link>

        <div class="sideBar_bottom">
          <router-link :to="ROUTES.COMING_SOON" class="sideBar__nav__second">
            <icon :name="Icons.SETTINGS" class="sideBar__nav__icon" />

            <p class="sideBar__nav__text">
              {{ localize("accountSettings", "lang-en") }}
            </p>
          </router-link>
          <div v-on:click="logout" class="sideBar__nav__second">
            <a class="sideBar__nav__last__container">
              <icon
                :name="Icons.LOGOUT"
                class="sideBar__nav__icon"
                :fill="colorAttr('Logout')"
              />
              <span class="sideBar__nav__text">{{
                localize("logout", "lang-en")
              }}</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ROUTES } from "@/router/routes";
import { Modules } from "@/store";
import { LoginActions } from "@/store/login/actions";
import localize from "@/localization/languages";

import Icon from "@/components/Icon.vue";
import { Icons } from "../IconPaths";

export default Vue.extend({
  components: {
    Icon
  },
  data: function() {
    return {
      localize,
      Icons
    };
  },
  computed: {
    refresh() {
      return this.$router.go(0);
    },
    route() {
      return this.$route.name;
    },
    ROUTES() {
      return ROUTES;
    }
  },
  methods: {
    colorAttr(x: string | string[]) {
      if (typeof x === "string" && x == this.route) {
        return "#295CD4";
      } else if (x && x.includes(this.route as string)) {
        return "#295CD4";
      }

      return "#7B7F82";
    },
    logout: function() {
      this.$store.dispatch(`${Modules.LOGIN}/${LoginActions.SET_USER_LOGOUT}`);
      this.$router.push(ROUTES.LOGIN);
    }
  }
});
</script>
