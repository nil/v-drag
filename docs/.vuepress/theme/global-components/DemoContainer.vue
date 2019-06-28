<template>
  <section class="demo-container">
    <div class="demo-container__header">
      <div class="demo-container__buttons">
        <div class="demo-container__button demo-container__button--close"></div>
        <div class="demo-container__button demo-container__button--minimize"></div>
        <div class="demo-container__button demo-container__button--fullscreen"></div>
      </div>
      <!-- <div class="demo-container__reset">reset</div> -->
    </div>

    <div class="demo-container__content"
      :class="customIdClass">
      <slot />
    </div>
  </section>
</template>

<script>

export default {
  props: {
    id: String
  },

  computed: {
    customIdClass() {
      return `demo--${this.id}`;
    }
  }
};

</script>
