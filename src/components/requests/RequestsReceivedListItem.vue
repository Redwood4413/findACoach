<script lang="ts">
import { PropType } from 'vue';

export default {
  name: 'RequestsReceivedListItem',
  props: {
    request: {
      type: Object as PropType<Request>,
      required: true,
    },
  },
  computed: {
    formattedEmail() {
      return `mailto:${this.request.email}`;
    },
    sentAbout() {
      const options: Intl.DateTimeFormatOptions = {
        dateStyle: 'short',
        timeStyle: 'short',
      };

      const formatter = new Intl.DateTimeFormat(undefined, options);
      return formatter.format(this.request.sentAbout);
    },
    fullName() {
      return `${this.request.firstName} ${this.request.lastName}`;
    },
  },
};
</script>

<template>
  <li class="coach-review">
    <div class="header">
      <div class="user-wrapper">
        <UserAvatar class="small" />
        <div class="user-info">
          <span class="user-name">
            {{ fullName }}
          </span>
          <a class="user-email" :href="formattedEmail">
            {{ request.email }}
          </a>
        </div>
      </div>
      <div class="sent-about">
        <div class="section-title">sent about:</div>
        <span>{{ sentAbout }}</span>
      </div>
    </div>
    <div class="message">
      <div class="section-title">Message:</div>
      {{ request.message }}
    </div>
  </li>
</template>

<style lang="scss" scoped>
.coach-review {
  display: flex;
  text-align: left;
  flex: 1;
  flex-direction: column;
  padding: 1em 0;
  border-bottom: $strong-gray 1px solid;
  .header {
    display: flex;
    .user-wrapper {
      display: flex;
      gap: 1em;
      .user-info {
        display: flex;
        justify-content: center;
        flex-direction: column;
        .user-name,
        .user-email {
          font-weight: 400;
        }
        .user-email {
          font-size: smaller;
        }
      }
    }
    .sent-about {
      color: $foreground-2;
      font-size: smaller;
      margin-left: auto;
      font-style: italic;
      text-align: right;
      font-family: 'Open Sans';
    }
  }

  .message {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    font-size: 0.9em;
  }
}
</style>
