<template>
  <header>
    <div class="content-wrap">
      <h1>
        Where in the world?
      </h1>

      <div class="switcher">
        <button @click="toggleDarkMode">{{ buttonText }}</button>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  emits: ['toggleDarkMode'],
  props: ['dark-mode-state'],
  computed: {
    buttonText() {
      return this.darkModeState ? 'Light mode' : 'Dark mode'
    }
  },
  methods: {
    toggleDarkMode() {
      this.$emit('toggleDarkMode')
    }
  }
}
</script>

<style scoped>
  header {
    background-color: var(--elem-bg);
    box-shadow: var(--shadow);
    transition: box-shadow .2s linear, background-color .1s linear;
  }
  h1 {
    transition: color .1s linear;
  }
  header > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>