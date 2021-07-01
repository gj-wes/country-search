<template>
  <the-header></the-header>
  <main class="content-wrap">
    <section class="search-filter" v-show="!detailsViewOpen">
        <country-search-bar @searchTextChanged="updateSearchText"></country-search-bar>
        <sort-filter-select @sortFilterChanged="updateSortFilter"></sort-filter-select>
        <region-filter-select @regionFilterChanged="updateRegionFilter"></region-filter-select>
    </section>
    <section class="country-list-container" ref="listScroll" v-if="countryData" v-show="!detailsViewOpen">
      <div class="country-list">
        <country-card 
          v-for="(country, i) in countriesWithSearchFilterSort"
          :key="i"
          :flag="country.flag"
          :name="country.name"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
          @viewDetails="openDetailView"
        ></country-card>
      </div>
    </section>
    <div v-else class="loader">Loading...</div>
    <details-view 
      :details="selectedCountry" 
      :border-countries="borderCountryNames" 
      v-if="detailsViewOpen" 
      @close="closeDetailsView"
    ></details-view>
  </main>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import CountrySearchBar from './components/CountrySearchBar.vue'
import RegionFilterSelect from './components/RegionFilterSelect.vue'
import SortFilterSelect from './components/SortFilterSelect.vue'
import CountryCard from './components/CountryCard.vue'
import DetailsView from './components/DetailsView.vue'

import { getCharCode } from './utils.js'

export default {
  name: 'App',
  components: {
    TheHeader,
    CountrySearchBar,
    RegionFilterSelect,
    SortFilterSelect,
    CountryCard,
    DetailsView,
  },
  data() {
    return {
      countryData: null,
      selectedCountry: null,
      detailsViewOpen: false,
      searchInputText: '',
      regionFilter: 'All',
      sortFilter: 'nameAZ',
      scrollOffset: 0
    }
  },
  methods: {
    openDetailView(e) {
      this.scrollOffset = this.$refs.listScroll.scrollTop

      const selected = this.countryData.filter(country => country.name === e.name)[0]
      this.selectedCountry = selected
      this.detailsViewOpen = true
    },
    closeDetailsView() {
      this.detailsViewOpen = false
      this.selectedCountry = null

      this.$refs.listScroll.scrollTop = this.scrollOffset
    },
    updateSearchText(value) {
      this.searchInputText = value.toLowerCase()
    },
    updateRegionFilter(value) {
      this.regionFilter = value
    },
    updateSortFilter(value) {
      this.sortFilter = value
    }
  },
  computed: {
    countriesWithSearchFilterSort() {
      let searchedAndFiltered;
      // search input only
      if (this.regionFilter === 'All' && this.searchInputText !== '') {
        searchedAndFiltered = this.countryData.filter(country => 
          country.name.toLowerCase().includes(this.searchInputText)
        )
      // region filter only
      } else if (this.regionFilter !== 'All' && this.searchInputText === '') {
        searchedAndFiltered = this.countryData.filter(country => 
          country.region === this.regionFilter
        )
      // both region and search
      } else if (this.regionFilter !== 'All' && this.searchInputText !== '') {
        searchedAndFiltered = this.countryData.filter(country => 
          country.region === this.regionFilter && 
          country.name.toLowerCase().includes(this.searchInputText)
        )
      } else {
        searchedAndFiltered = this.countryData
      }
      
      // apply sorts
      let sortedList
      switch (this.sortFilter) {
        case 'nameAZ':
          sortedList = searchedAndFiltered.sort((a,b) => (getCharCode(a.name) > getCharCode(b.name)) ? 1 : ((getCharCode(b.name) > getCharCode(a.name)) ? -1 : 0))
          break;
        case 'nameZA':
          sortedList = searchedAndFiltered.sort((a,b) => (getCharCode(b.name) > getCharCode(a.name)) ? 1 : ((getCharCode(a.name) > getCharCode(b.name)) ? -1 : 0))
          break;
        case 'popAsc':
          sortedList = searchedAndFiltered.sort((a,b) => (b.population > a.population) ? 1 : ((a.population > b.population) ? -1 : 0))
          break;
        case 'popDes':
          sortedList = searchedAndFiltered.sort((a,b) => (a.population > b.population) ? 1 : ((b.population > a.population) ? -1 : 0))
          break;
        case 'capAZ':
          sortedList = searchedAndFiltered.sort((a,b) => (a.capital > b.capital) ? 1 : ((b.capital > a.capital) ? -1 : 0))
          break;
        case 'capZA':
          sortedList = searchedAndFiltered.sort((a,b) => (b.capital > a.capital) ? 1 : ((a.capital > b.capital) ? -1 : 0))
          break;
      
        default: sortedList = searchedAndFiltered
          break;
      }
      
      return sortedList
    },
    borderCountryNames() {
      // Gets full names of border Countries for detail view
      const borders = this.selectedCountry.borders
      const names = []

      for (const brd of borders) {
        const countryObj = this.countryData.find(country => country.alpha3Code === brd)
        if (countryObj) names.push(countryObj.name)
      }

      if (names.length) {
        return names
      } else {
        return borders
      }
    }
  },
  async created() {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
                            .then(res => res.json())
                            .then(data => data)
                  
    this.countryData = response
  }
}
</script>

<style scoped>
 main {
   height: calc(100vh - 72px);
   display: flex;
   flex-direction: column;
 }
 .search-filter {
   margin-top: 4rem;
   display: flex;
   flex-wrap: wrap;
 }
 .country-list-container {
   padding: 4rem .2rem;
   overflow-y: scroll;
 }
 .country-list {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
   gap: 6rem;
 }
 .loader {
   margin-top: 2.5rem;
   text-align: center;
 }
</style>
