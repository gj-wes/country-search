<template>
  <div>
    <label id="regionFilterSelect">Filter by Region:</label>
    <select v-model="selectedRegionFilter" @change="$emit('regionFilterChanged', selectedRegionFilter)" id="regionFilterSelect">
      <option value="All" selected>All</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  </div>
</template>

<script>
export default {
  emits: ['regionFilterChanged'],
  data() {
    return {
      selectedRegionFilter: 'All'
    }
  }
}
</script>

<style scoped>
  label {
    display: block;
    margin-left: 1rem;
  }
  select {
    margin: .8rem 0 .8rem 1rem;
  }
</style>