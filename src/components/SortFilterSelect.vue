<template>
  <div>
    <label for="countrySortSelect">Sort by:</label>
    <select v-model="selectedSortFilter" @change="$emit('sortFilterChanged', selectedSortFilter)" id="countrySortSelect">
      <option value="nameAZ" selected>A-Z</option>
      <option value="nameZA">Z-A</option>
      <option value="popAsc">Population &uarr;</option>
      <option value="popDes">Population &darr;</option>
      <option value="capAZ">Captials A-Z</option>
      <option value="capZA">Captials Z-A</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSortFilter: 'nameAZ'
    }
  }
}
</script>

<style scoped>
  label {
    display: block;
  }
  select {
    margin: .8rem 0;
  }
</style>