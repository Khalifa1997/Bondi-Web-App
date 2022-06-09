<template>
  <div class="progress-bar">
    <progress-modal
      :site="site"
      :orderID="orderID"
      :index="progressType"
      @progressed="progressedModal($event)"
      v-if="progressModalOpen"
      v-scroll-lock="progressModalOpen"
      @clicked="toggleProgress"
    />
    <template v-for="(item, index) in headers">
      <div class="progress-bar__node" :key="index">
        <div
          :class="
            `${
              currentNode === index && currentNode < 4
                ? 'progress-bar__selected'
                : ''
            }`
          "
        >
          <div
            class="progress-bar__passed"
            @mouseover="hoverOn(index)"
            :class="{
              'progress-bar__currentNumber':
                currentNode === index && currentNode < 4,
              'progress-bar__completedNumber':
                currentNode > index || currentNode === 4
            }"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div class="progress-bar__text">
          <div :class="{ 'progress-bar__textSelected': currentNode >= index }">
            {{ item.title }}
          </div>
          <div
            :class="
              `${
                currentNode >= index
                  ? 'progress-bar__descriptionCompleted'
                  : 'progress-bar__descriptionNotCompleted'
              }`
            "
          >
            {{
              currentNode === index
                ? `${item.timestamp.toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  })} ${item.timestamp.toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })}`
                : index > currentNode
                ? `Pending`
                : `${item.timestamp.toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  })} ${item.timestamp.toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })}`
            }}
          </div>
        </div>

        <primary-button
          v-if="
            GET_USER_LOGIN.user.permissions.CanManageOrder &&
              index === currentNode &&
              currentNode < headers.length - 1
          "
          class="progress-bar__button button--light"
          @click.native="openProgess(index)"
          :key="index"
          :ButtonName="`Mark as ` + headers[currentNode + 1].title"
        >
        </primary-button>
        <a
          :href="trackURL"
          target="_blank"
          class="progress-bar__button"
          v-else-if="
            !GET_USER_LOGIN.user.permissions.CanManageOrder &&
              currentNode === 2 &&
              index === currentNode &&
              GET_USER_LOGIN.user.permissions.CanOrderDevice
          "
          :key="index"
        >
          <primary-button class="button--light" ButtonName="Track Order">
          </primary-button>
        </a>
        <transition name="fade">
          <div v-if="hoveredIndex === index" class="progress-bar__info">
            <progress-bar-info :date="formatDate(item.timestamp)" />
          </div>
        </transition>
      </div>
      <div
        :key="`line` + index"
        v-if="index < headers.length - 1"
        class="progress-bar__line "
        :class="{
          'progress-bar__lineStart': currentNode == index,
          'progress-bar__lineCompleted': currentNode > index
        }"
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import localize from "@/localization/languages";
import ProgressBarInfo from "@/components/ProgressBarInfo.vue";
import ProgressModal from "@/components/ProgressModal.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { LoginGetters } from "@/store/login/getters";
import { createNamespacedHelpers } from "vuex";
import { Modules } from "@/store";

const { mapGetters } = createNamespacedHelpers(Modules.LOGIN);

export default Vue.extend({
  data: function() {
    return {
      localize,
      hoveredIndex: -1,
      progressModalOpen: false,
      progressType: 3
    };
  },
  components: {
    ProgressBarInfo,
    ProgressModal,
    PrimaryButton
  },
  props: {
    trackURL: {
      type: String,
      default: ""
    },
    currentNode: {
      default: 0 as number
    },
    site: {
      default: ""
    },
    orderID: {
      default: -1
    },
    headers: {
      default: ([] as unknown) as {
        title: string;
        timestamp: Date;
        status: "Finished" | "Pending";
      }[]
    }
  },
  methods: {
    hoverOn(n: number) {
      if (this.currentNode >= n) this.hoveredIndex = n;
    },
    toggleProgress() {
      this.progressModalOpen = !this.progressModalOpen;
    },
    progressedModal(x: boolean) {
      this.toggleProgress();
      this.$emit("progressed", x);
    },
    openProgess(index: number) {
      if (this.currentNode === index && [1, 2, 3].includes(index)) {
        this.progressModalOpen = true;
        this.progressType = index;
      }
    },
    formatDate(date: Date) {
      const d = parseInt(date.toLocaleString("en-US", { day: "numeric" }));
      let n = "";
      if (d > 3 && d < 21) n = "th";
      switch (d % 10) {
        case 1:
          n = "st";
          break;
        case 2:
          n = "nd";
          break;
        case 3:
          n = "rd";
          break;
        default:
          n = "th";
          break;
      }

      return (
        d +
        n +
        ` of ` +
        date.toLocaleString("default", { month: "long" }) +
        ` ` +
        +date.getFullYear() +
        ` ` +
        date.toLocaleString(`en-US`, {
          hour: `2-digit`,
          minute: `2-digit`,
          hour12: true
        })
      );
    }
  },
  computed: {
    ...mapGetters([LoginGetters.GET_USER_LOGIN])
  }
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
