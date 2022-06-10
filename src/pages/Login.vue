<template>
  <div class="login">
    <div class="login__logo">
      <img :src="require(`@/assets/Asset.png`)" style="width: 300px;" />
    </div>
    <div class="login__section-left">
      <div class="login__form">
        <div class="login__form__title">Login</div>
        <div class="login__form__email">
          <Input
            :inputLabel="`Username/Email [admin/password]`"
            :inputType="`text`"
            :inputPlaceholder="`me@example.com or UserName`"
            @input="emailChangeHandle($event)"
          />
        </div>
        <div class="login__form__password">
          <Input
            :inputLabel="`Password`"
            :inputType="`password`"
            :inputPlaceholder="`Password`"
            @input="passwordChangeHandle($event)"
          />
        </div>
        <div class="login__form__submit">
          <div
            v-on:click="submitLogin"
            class="button button--wide button--light login__button"
          >
            <div class="">
              <h1>login</h1>
            </div>
          </div>
        </div>
        <div
          class="login__form__forget-password login__form__forget-password--light"
        >
          <router-link :to="ROUTES.FORGET_PASSWORD_EMAIL"
            >Forget password?
          </router-link>
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
          {{ localize("welcomeHeader", "lang-en") }}
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
import { Modules } from "@/store";
import { LoginActions } from "@/store/login/actions";
import { ROUTES } from "@/router/routes";
import localize from "@/localization/languages";
import { mapGetters } from "vuex";
import { LoginGetters } from "@/store/login/getters";

export default Vue.extend({
  name: "Login",
  components: {
    Input
  },
  data: function() {
    return {
      localize,
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(Modules.LOGIN, [LoginGetters.GET_USER_AUTHENTICATION]),
    ROUTES() {
      return ROUTES;
    }
  },
  watch: {
    GET_USER_AUTHENTICATION: function(newVal: boolean) {
      if (newVal) {
        this.$router.push(ROUTES.DASHBOARD);
      }
    }
  },
  methods: {
    emailChangeHandle: function(value: string) {
      this.email = value;
    },
    passwordChangeHandle: function(value: string) {
      this.password = value;
    },
    submitLogin: function() {
      this.$store.dispatch(`${Modules.LOGIN}/${LoginActions.GET_USER_LOGIN}`, {
        email: this.email,
        password: this.password
      });
    }
  }
});
</script>
