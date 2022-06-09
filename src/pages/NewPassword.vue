<template>
  <div class="login">
    <div class="login__logo">
      <img src="@/assets/loginpageslogo.svg" alt="logo" />
    </div>
    <div class="login__section-left">
      <div class="login__form">
        <div class="login__form__title">
          {{ localize("enterNewPassword", "lang-en") }}
        </div>
        <p class="text-sm text-quaternary">
          {{ localize("reassignPassword", "lang-en") }}
        </p>
        <div class="login__form__email">
          <Input
            :inputLabel="`Password`"
            :inputType="`password`"
            :inputPlaceholder="`Password`"
            @input="passwordChangeHandle($event)"
          />
        </div>
        <div class="login__form__password">
          <Input
            :inputLabel="`Re-type Password`"
            :inputType="`password`"
            :inputPlaceholder="`Retype Password`"
            @input="newPasswordChangeHandle($event)"
          />
        </div>
        <div class="login__form__submit">
          <div class="button button--wide button--light login__button">
            <router-link :to="ROUTES.LOGIN" tag="button">
              <div>{{ localize("confirm", "lang-en") }}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="login__section-right">
      <img
        src="@/assets/background.png"
        height="720"
        style="object-fit: cover;"
      />
      <!--       <div
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
import localize from "@/localization/languages";
import { ROUTES } from "@/router/routes";

export default Vue.extend({
  name: "Login",
  components: {
    Input
  },
  data: function() {
    return {
      password: "",
      newpassword: "",
      localize
    };
  },
  computed: {
    ROUTES() {
      return ROUTES;
    }
  },
  methods: {
    passwordChangeHandle: function(value: string) {
      this.password = value;
    },
    newPasswordChangeHandle: function(value: string) {
      this.newpassword = value;
    }
  }
});
</script>
