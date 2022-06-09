<template>
  <div class="errorModal">
    <div class="errorModal__container">
      <img src="@/assets/error.svg" class="w-24 h-24" />
      <div class="errorModal__text">
        <h1 class="errorModal__title">Something went wrong.</h1>
        <p class="errorModal__paragraph">
          Please try again, meanwhile we’ve informed our team with what went
          wrong. We’re working on fixing it now.
        </p>
      </div>

      <primary-button
        class="errorModal__button"
        ButtonName="Close Error"
        @click.native="closeModal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
export default Vue.extend({
  components: {
    PrimaryButton
  },
  methods: {
    closeModal() {
      this.$emit(`clicked`);
    }
  }
});
</script>
