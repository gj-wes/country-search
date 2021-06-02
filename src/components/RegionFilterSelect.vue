<template>
  <select v-model="selectedRegionFilter" @change="$emit('regionFilterChanged', selectedRegionFilter)">
    <option value="" disabled>Filter by Region</option>
    <option value="All">All</option>
    <option value="Africa">Africa</option>
    <option value="Americas">Americas</option>
    <option value="Asia">Asia</option>
    <option value="Europe">Europe</option>
    <option value="Oceania">Oceania</option>
  </select>
</template>

<script>
export default {
  emits: ['regionFilterChanged'],
  data() {
    return {
      selectedRegionFilter: ''
    }
  }
}
</script>

<style scoped>
  select {
    margin: .8rem 0 .8rem 1rem;
  }
</style>