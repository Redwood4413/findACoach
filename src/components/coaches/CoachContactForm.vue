<script lang="ts">
import BaseSubmitButton from '../UI/BaseSubmitButton.vue';
import SendIcon from '../icons/SendIcon.vue';

export default {
  name: 'CoachContactForm',
  emits: ['send'],
  data: () => ({
    name: {
      data: '',
      isValid: true,
      maxLen: 32,
    },
    email: {
      data: '',
      isValid: true,
      maxLen: 254,
    },
    message: {
      data: '',
      isValid: true,
      maxLen: 128,
    },
    formIsValid: false,
  }),
  computed: {
    inputName() {
      return this.name.data;
    },
    inputEmail() {
      return this.email.data;
    },
    inputMessage() {
      return this.message.data;
    },
  },
  methods: {
    nameValidation() {
      const { name } = this;

      if (name.data.length > name.maxLen || !name.data.length) {
        this.name.isValid = false;
      } else {
        this.name.isValid = true;
      }
    },
    emailValidation() {
      const { email } = this;
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

      const isValid = regex.test(email.data);
      if (!isValid || email.data.length > email.maxLen) {
        this.email.isValid = false;
      } else {
        this.email.isValid = true;
      }
    },
    messageValidation() {
      const { message } = this;

      if (message.data.length > message.maxLen) {
        this.message.isValid = false;
      } else {
        this.message.isValid = true;
      }
    },
    inputsValidation() {
      const {
        name,
        email,
        message,
        nameValidation,
        emailValidation,
        messageValidation,
      } = this;
      nameValidation();
      emailValidation();
      messageValidation();

      if (!name.isValid || !email.isValid || !message.isValid) {
        this.formIsValid = false;
      } else {
        this.formIsValid = true;
      }
    },
    emitEvent() {
      this.inputsValidation();
      if (!this.formIsValid) return;

      const { name, email, message } = this;
      const payload = {
        name: name.data,
        email: email.data,
        message: message.data,
      };
      this.$emit('send', payload);
    },
  },
  watch: {
    inputName() {
      this.nameValidation();
    },
    inputMessage() {
      this.messageValidation();
    },
  },
  components: { BaseSubmitButton, SendIcon },
};
</script>

<template>
  <form class="form" @submit.prevent="emitEvent" novalidate>
    <span class="section-title">Contact:</span>
    <div class="input-wrapper">
      <input id="name" v-model="name.data" required />
      <label type="text" for="name">Your name<sup>*</sup></label>
      <div class="validation">
        <span class="invalid" v-if="!name.isValid">Your name is invalid!</span>
        <span class="counter">{{ name.data.length }}/{{ name.maxLen }}</span>
      </div>
    </div>
    <div class="input-wrapper">
      <input id="email" v-model="email.data" @blur="emailValidation" required />
      <label type="email" for="email">E-mail<sup>*</sup></label>
      <div class="validation">
        <span class="invalid" v-if="!email.isValid"
          >Your e-mail is invalid!</span
        >
        <span class="counter">{{ email.data.length }}/{{ email.maxLen }}</span>
      </div>
    </div>
    <div class="input-wrapper">
      <textarea id="message" v-model="message.data" rows="3" required />
      <label type="text" for="message">Message</label>
      <div class="validation">
        <span class="invalid" v-if="!message.isValid"
          >Your message is too long!</span
        >
        <span class="counter"
          >{{ message.data.length }}/{{ message.maxLen }}</span
        >
      </div>
    </div>
    <div class="buttons">
      <BaseSubmitButton :isValid="formIsValid">
        <span>Send</span>
        <SendIcon />
      </BaseSubmitButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  justify-content: center;
  text-align: left;
  .input-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    input,
    textarea {
      background: none;
      border: 0;
      border-bottom: 2px solid colors.$foreground-2;
      &:focus-within,
      &:valid {
        outline: none;
        & + label {
          top: -2em;
          font-size: small;
        }
      }
      &:focus-within {
        background: colors.$background-4;
      }
    }
    label {
      top: 0;
      transition-property: top, font-size;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      pointer-events: none;
      user-select: none;
      position: absolute;
      color: colors.$foreground-2;
      font-weight: 400;
      sup {
        color: colors.$red;
        font-weight: 800;
      }
    }
    input,
    label,
    textarea {
      padding: 0.3em;
      font-weight: 400;
    }
    textarea {
      resize: vertical;
      min-height: 100px;
    }
    .validation {
      display: flex;
      font-size: small;
      .invalid {
        color: colors.$red;
        font-weight: 800;
      }
      .counter {
        font-weight: 300;
        margin-left: auto;
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
