<template>
  <div>
    <label for="countryNameSearchInput">Search for Country by name:</label>
    <input 
      type="text" 
      placeholder="United Kingdom..." 
      v-model="inputSearchText"
      @keyup="updateSearch"
      id="countryNameSearchInput">
  </div>
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
  div {
    margin-right: auto;
  }
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
    margin: .8rem 0;
  }
</style>