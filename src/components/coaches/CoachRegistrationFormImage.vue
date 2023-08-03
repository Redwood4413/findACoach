<script lang="ts">

export default {
  name: 'CoachRegistrationFormImage',
  data: () => ({
    image: null as HTMLImageElement | null,
    maxDimensions: {
      x: 1000,
      y: 1000,
    },
    maxSize: 10240,
  }),
  methods: {
    fileUpload(e) {
      this.createImage(e.target.files[0]);
    },
    createImage(file) {
      const reader = new FileReader();

      const something = this;
      reader.onload = (e) => {
        something.image = e.target?.result;
      };
      reader.readAsDataURL(file);
      console.log(file);
    },
  },
};
</script>

<template>
  <div class="input-wrapper">
    <input
      type="file"
      id="image"
      @change="fileUpload"
      accept="image/jpeg, image/png"
    >
    <label for="image">E-mail</label>
  </div>
  <img :src="image">
</template>
