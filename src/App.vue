<template>
  <BaseCard>
    <h2>Daten aus "$AAPL"</h2>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        {{ item['Mar 21'] || '–' }}
      </li>
    </ul>
  </BaseCard>

  <BaseCard>

  </BaseCard>
</template>

<script>
import BaseCard from './components/BaseCard.vue';
import { stockService } from './services/stockService.js';

export default {
  name: 'App',
  components: {
    BaseCard
  },
  data() {
    console.log('[data()] läuft...');
    return {
      data: []
    };
  },
  async created() {
    this.data = await stockService.fetchData('%24AAPL');
    console.log('Geladene Daten:', this.data);
  }
};
</script>

<style>
* {
  margin: 0;
}

body {
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  width: 100vw;
  min-height: 100vh;
}

li {
  color:white;
}
</style>
