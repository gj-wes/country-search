<template>
  <div class="back">
    <button @click="closeDetails">&larr; Back</button>
  </div>
  <section class="details-content">
    <picture>
      <img :src="details.flag" :alt="flagAlt" class="details-flag">
    </picture>
    <article>
      <h2>{{ details.name }}</h2>
      <div class="details-points">
        <p>Native Name: <span>{{ details.nativeName }}</span></p>
        <p>Population: <span>{{ popWithComma }}</span></p>
        <p>Region: <span>{{ details.region }}</span></p>
        <p>Sub Region: <span>{{ details.subregion }}</span></p>
        <p>Capital: <span>{{ details.capital }}</span></p>
        <p>Top Level Domain: <span>{{ details.topLevelDomain[0] }}</span></p>
        <p>Currencies: <span>{{ returnList(details.currencies) }}</span></p>
        <p>Languages: <span>{{ returnList(details.languages) }}</span></p>
      </div>
      <div v-if="borderCountries.length">
      <p class="details-borders">
        Border Countries: 
      </p>
      <span class="border" v-for="(country, i) of borderCountries" :key="i">{{ country }}</span>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  emits: ['closeDetails'],
  props: ['details', 'borderCountries'],
  computed: {
    flagAlt() {
      return `Flag of ${this.details.name}`
    },
    popWithComma() {
      const popNum = Number(this.details.population)

      return popNum.toLocaleString('en-US')
    }
  },
  methods: {
    closeDetails() {
      this.$emit('close')
    },
    returnList(arr) {
      const values = [];
      
      for (const item of arr) {
        values.push(item.name)
      }

      if (values.length > 1) {
        return values.join(', ')
      } else {
        return values[0]
      }
    }
  }
}
</script>

<style scoped>
  .back {
    margin: 5rem 0;
  }
  h2 {
    margin-bottom: 2rem;
    transition: color .1s linear;
  }
  p {
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 0.8rem;
    transition: color .1s linear;
  }
  span {
    font-weight: 300;
  }
  .details-flag {
    max-width: 100%;
  }
  .details-content {
    display: grid;
    gap: 8rem;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  }
  .details-points {
    columns: 2 auto;
  }
  @media screen and (max-width: 44em) {
    .details-content {
      grid-template-columns: 1fr;
    }
    .details-points {
      columns: 1 auto;
    }
  }
  .details-borders {
    margin: 4rem 0 1rem 0;
  }
  span.border {
    box-shadow: var(--shadow);
    display: inline-block;
    padding: .5rem .8rem;
    border-radius: .3rem;
    margin: 0 1rem 1rem 0;
  }
</style>