<script lang="ts">
export default {
  name: 'TheHeader',
};
</script>

<template>
  <header class="header">
    <RouterLink :to="{ name: 'home' }">
      <h2>Find a Coach</h2>
    </RouterLink>
    <div class="buttons">
      <RouterLink :to="{ name: 'register' }">Register</RouterLink>
      <RouterLink :to="{ name: 'requests' }">Requests</RouterLink>

    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    width:100%;
    display:flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 2px solid white;
    background: rgb(255,255,255, 0.2);
    backdrop-filter: blur(3px);
  }
  .buttons {
    display:flex;
    height:100%;
    a {
      background: rgb(0,0,0, 0.2);
      padding:1rem;
      transition: background .1s ease-in-out;
      &:hover {
      background: rgb(0,0,0, 0.3);

      }
    }
  }
</style>
