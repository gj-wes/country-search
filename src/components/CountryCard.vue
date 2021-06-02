<template>
  <article class="card" @click="viewDetails(name)">
    <img :src="flag" :alt="flagAlt" class="card__flag" loading="lazy">
    <div class="card__content">
      <h3>{{ name }}</h3>
      <p>Population: <span>{{ popWithComma }}</span></p>
      <p>Region: <span>{{ region }}</span></p>
      <p>Capital: <span>{{ capital }}</span></p>
    </div>
  </article>
</template>

<script>
export default {
  emits: ['viewDetails'],
  props: ['flag', 'name', 'population', 'region', 'capital'],
  computed: {
    flagAlt() {
      return `Flag of ${this.name}`
    },
    popWithComma() {
      const popNum = Number(this.population)

      return popNum.toLocaleString('en-US')
    }
  },
  methods: {
    viewDetails(name) {
      this.$emit('viewDetails', {name} )
    }
  }
}
</script>

<style scoped>
  .card {
    background-color: var(--elem-bg);
    border-radius: 1rem;
    box-shadow: var(--shadow);
    transition: transform .1s ease-in-out, box-shadow .2s linear, box-shadow .2s linear;
  }
  .card:hover {
    transform: translateY(-.4rem);
    box-shadow: var(--shadow-hover);
  }
  .card__flag {
    width: 100%;
    height: 45%;
    display: block;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    object-fit: cover;
  }
  .card__content {
    padding: 2.5rem;
  }
  h3 {
    margin-top: 0;
  }
  p {
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }
  span {
    font-weight: 300;
  }
</style>