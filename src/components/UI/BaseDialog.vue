<script lang="ts">
import CloseIcon from '../icons/CloseIcon.vue';

export default {
  name: 'BaseDialog',
  components: {
    CloseIcon,
  },
  props: {
    returnTo: {
      type: [String, Object],
      required: true,
    },
  },
  methods: {
    backdropClick(e: MouseEvent) {
      const dialogDimensions = this.dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left
        || e.clientX > dialogDimensions.right
        || e.clientY < dialogDimensions.top
        || e.clientY > dialogDimensions.bottom) {
        this.hideDialog();
      }
    },
    hideDialog() {
      this.$router.push(this.returnTo);
      this.dialog.close();
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
  },
  mounted() {
    this.showDialog();

    this.body.classList.add('hidden-overflow');
    this.dialog.addEventListener('mouseup', this.backdropClick);
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
        <BaseButton mode="flat rounded square" @click="hideDialog" title="Close">
          <CloseIcon />
        </BaseButton>
      </div>
      <slot />
    </dialog>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
@import '@/colors.scss';
  .base-dialog {
    background: colors.$background-3;
    color: colors.$foreground-0;
    padding:0;
    border:0;
    outline: 0;
    width: 600px;
    min-height: 400px;
    max-height: 90vh;
    border-radius: 5px;
    overflow-y: auto;
    -webkit-box-shadow: 5px 5px 0px 0px colors.$background-0;
    -moz-box-shadow: 5px 5px 0px 0px colors.$background-0;
    box-shadow: 5px 5px 0px 0px colors.$background-0;
    &::backdrop {
      background-color: #1D202170;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      cursor: pointer;
    }
    .nav {
      display:flex;
      justify-content: flex-end;
      width: 100%;
      position: absolute;
      padding:0.5rem;
      background: linear-gradient(to bottom, colors.$background-0 0%, transparent 80%);
    }
  }
  @media (width <= 600px) {
    .base-dialog {
      min-width:100vw;
    }
  }
</style>
