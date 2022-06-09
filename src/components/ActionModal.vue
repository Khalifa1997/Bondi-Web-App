<template>
  <div class="actionModal">
    <div class="actionModal__container" v-click-outside="closeModal">
      <h1 class="actionModal__header">
        {{ title }}
      </h1>
      <p class="actionModal__text">
        {{ description }}
      </p>
      <div class="actionModal__buttonGroup">
        <primary-button
          class="actionModal__button actionModal__cancel"
          ButtonName="Cancel"
          @click.native="closeModal"
        />
        <primary-button
          @click.native="submit"
          class="actionModal__button actionModal__delete"
          :ButtonName="buttonName"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import localize from "@/localization/languages";

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
      localize
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    buttonName: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      required: true
    }
  },
  components: {
    PrimaryButton
  },
  methods: {
    closeModal() {
      this.$emit("clicked");
    },
    submit() {
      this.action();
      this.closeModal();
    }
  }
});
</script>
