<script lang="ts">
import { PropType } from 'vue';

type Icon = 'close' | 'return';

export default {
  name: 'BaseDialog',
  props: {
    returnTo: {
      type: [String, Object],
      required: true,
    },
    iconType: {
      type: String as PropType<Icon>,
      default: 'close',
    },
  },
  methods: {
    backdropClick(e: MouseEvent) {
      const dialogDimensions = this.dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        this.hideDialog();
      }
    },
    hideDialog() {
      this.$router.push(this.returnTo);
      this.dialog.close();
    },
    historyBack() {
      this.$router.go(-1);
    },
    showDialog() {
      this.dialog.showModal();
    },
  },
  computed: {
    dialog() {
      return this.$refs.dialog as HTMLDialogElement;
    },
    body() {
      return document.querySelector('body')!;
    },
    closeIcon() {
      return this.iconType === 'close';
    },
    returnIcon() {
      return this.iconType === 'return';
    },
  },

  mounted() {
    this.showDialog();

    this.body.classList.add('hidden-overflow');
    this.dialog.addEventListener('mousedown', this.backdropClick);
    this.dialog.addEventListener('close', this.hideDialog);
  },
  unmounted() {
    this.body.classList.remove('hidden-overflow');
  },
};
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="base-dialog">
      <div class="nav">
        <BaseButton
          v-if="closeIcon"
          mode="flat rounded square"
          @click="hideDialog">
          <material-symbols:close-rounded />
        </BaseButton>
        <BaseButton
          v-else-if="returnIcon"
          mode="flat rounded square"
          @click="historyBack">
          <material-symbols:arrow-back-ios-new-rounded />
        </BaseButton>
      </div>
      <slot />
    </dialog>
  </Teleport>
</template>

<style lang="scss" scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
}
.base-dialog {
  display: flex;
  justify-content: center;
  min-height: 400px;
  max-height: 100svh;
  width: 600px;
  background: $background-3;
  color: $foreground-0;
  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 5px;
  overflow-y: auto;
  -webkit-box-shadow: 5px 5px 0px 0px $background-0;
  -moz-box-shadow: 5px 5px 0px 0px $background-0;
  box-shadow: 5px 5px 0px 0px $background-0;
  &::backdrop {
    background-color: #1d202170;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    cursor: pointer;
  }
}
@media (width <= 600px) {
  .base-dialog {
    min-width: 100vw;
  }
}
</style>
