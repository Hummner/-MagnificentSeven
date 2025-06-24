<template>
  <BaseCard>

  
    <div v-for="(item, index) in 7" :key="quarter[index]">
      <BaseCard>
      {{ data[data.length - 1] }} {{ quarter[data.length - 1] }}
    </BaseCard>
      
    </div>

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
      data: [],
      quarter: []
    };
  },
  async created() {
    this.data = await stockService.getRevenue('%24AAPL');
    this.quarter = await stockService.getQuarter('%24AAPL');
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
