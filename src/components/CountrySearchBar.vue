<template>
  <input 
    type="text" 
    placeholder="Search for a Country..." 
    v-model="inputSearchText"
    @keyup="updateSearch">
</template>

<script>
export default {
  emits: ['searchTextChanged'],
  data() {
    return {
      inputSearchText: ''
    }
  },
  methods: {
    updateSearch() {
      this.$emit('searchTextChanged', this.inputSearchText)
    }
  }
}
</script>

<style scoped>
  input {
    width: 100%;
    max-width: 48rem;
    border: none;
    padding: 1rem 1.5rem;
    box-shadow: var(--shadow);
    background-color: var(--elem-bg);
    color: inherit;
    font-family: inherit;
    transition: box-shadow .2s linear, background-color .1s linear, color .1s linear;
    margin: .8rem auto .8rem 0
  }
</style>