<template>
  <div class="input input--light">
    <div v-if="inputLabel.length > 0" class="input__label input__label--light">
      {{ inputLabel }}
    </div>
    <MaskedInput
      class="input__text input__text--light"
      :disabled="disabled"
      :mask="
        isMask
          ? [
              '0',
              '0',
              '-',
              /[0-9a-fA-F]/,
              /[0-9a-fA-F]/,
              '-',
              /[0-9a-fA-F]/,
              /[0-9a-fA-F]/,
              '-',
              /[0-9a-fA-F]/,
              /[0-9a-fA-F]/,
              '-',
              /[0-9a-fA-F]/,
              /[0-9a-fA-F]/,
              '-',
              /[0-9a-fA-F]/,
              /[0-9a-fA-F]/
            ]
          : false
      "
      :placeholder="inputPlaceholder"
      :type="inputType"
      @input="$emit('input', $event)"
    ></MaskedInput>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import MaskedInput from "vue-text-mask";

export default Vue.extend({
  name: "Input",
  components: {
    MaskedInput
  },
  methods: {
    logger: function(e: unknown) {
      console.log(e);
    }
  },
  props: {
    inputType: {
      default: "text" as "text" | "password"
    },
    inputLabel: {
      default: "" as string
    },
    inputPlaceholder: {
      default: "" as string
    },
    disabled: {
      default: false as boolean
    },
    isMask: {
      default: false as boolean
    }
  }
});
</script>
