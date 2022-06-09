<template>
  <!-- Start of component -->
  <div
    class="card"
    :class="{
      card__img: this.$slots.img,
      card__img__notModal: this.$slots.img && !isModalCard,
      card__img__Modal: this.$slots.img && isModalCard,
      card__img__notImg: !this.$slots.img
    }"
  >
    <div
      :class="{
        card__content__notModal: !isModalCard,
        card__content__modal: isModalCard
      }"
    >
      <slot name="img"></slot>

      <div
        :class="{
          card__text__img: this.$slots.img,
          card__text__img__notModal: !isModalCard && this.$slots.img,
          card__text__img__Modal: isModalCard && this.$slots.img
        }"
      >
        <h1
          :class="{
            card__header__modal: isModalCard,
            card__header: !isModalCard
          }"
        >
          {{ header }}
        </h1>
        <slot name="price"></slot>
        <slot name="paragraph"></slot>

        <div v-if="this.$slots.img" class="card__img__company__label">
          <slot name="company"></slot>

          <Label
            v-if="title"
            :title="title"
            class="card__label"
            :class="{
              card__label__notModal: !isModalCard,
              card__label__modal: isModalCard
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- End of component -->
</template>

<script lang="ts">
import Vue from "vue";
import Label from "@/components/Label.vue";
export default Vue.extend({
  components: {
    Label
  },
  props: {
    header: {
      type: String,
      default: ""
    },
    isModalCard: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  }
});
</script>
