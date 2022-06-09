<template>
  <div class="login">
    <div class="login__logo">
      <img :src="require(`@/assets/Asset.png`)" style="width: 140px;" />
    </div>
    <div class="login__section-left">
      <div class="login__form">
        <div class="login__form__title">
          <div>{{ localize("forgetPassword", "lang-en") }}</div>
        </div>
        <p class="text-sm text-quaternary">
          {{ localize("enterEmailCode", "lang-en") }}
        </p>
        <div class="login__form__email">
          <Input
            :inputLabel="`Code`"
            :inputType="`text`"
            :inputPlaceholder="`Code`"
            @input="emailChangeHandle($event)"
          />
        </div>

        <div class="login__form__submit">
          <div class="button button--wide button--light login__button">
            <router-link :to="ROUTES.DASHBOARD" tag="button">
              <div>{{ localize("send", "lang-en") }}</div>
            </router-link>
          </div>
        </div>
        <div class="mt-6 flex flex-row" style="max-width: 37.6rem">
          <a class="text-sm text-textTertiary">
            <router-link :to="ROUTES.LOGIN">
              <div>{{ localize("resend", "lang-en") }}</div>
            </router-link>
          </a>
          <a class="text-sm text-quaternary ml-auto">
            <div>{{ localize("arrivesIn60", "lang-en") }}</div>
          </a>
        </div>
      </div>
    </div>
    <div class="login__section-right">
      <img
        src="@/assets/background.png"
        height="720"
        style="object-fit: cover;"
      />
      <!-- <div
        class="login__section-right__caption login__section-right__caption--light"
      >
        <div class="login__section-right__caption__title">
          You are welcome with Bondi
        </div>
        <div class="login__section-right__caption__description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Input from "@/components/Input.vue";
import { ROUTES } from "@/router/routes";
import localize from "@/localization/languages";

export default Vue.extend({
  name: "ForgetPasswordNumber",
  components: {
    Input
  },
  data: function() {
    return {
      email: "",
      password: "",
      localize
    };
  },
  computed: {
    ROUTES() {
      return ROUTES;
    }
  },
  methods: {
    emailChangeHandle: function(value: string) {
      this.email = value;
    },
    passwordChangeHandle: function(value: string) {
      this.password = value;
    }
  }
});
</script>
