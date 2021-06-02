<template>
  <select v-model="selectedSortFilter" @change="$emit('sortFilterChanged', selectedSortFilter)">
    <option value="" disabled>Sort by</option>
    <option value="nameAZ" selected>A-Z</option>
    <option value="nameZA">Z-A</option>
    <option value="popAsc">Population &uarr;</option>
    <option value="popDes">Population &darr;</option>
    <option value="capAZ">Captials A-Z</option>
    <option value="capZA">Captials Z-A</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selectedSortFilter: ''
    }
  }
}
</script>

<style scoped>
  select {
    margin: .8rem 0;
  }
</style>