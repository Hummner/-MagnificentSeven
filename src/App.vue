<template>
  <BaseCard class="basecard-upside">

  
    <div class="basecard-upside" v-for="(item, index) in 7" :key="quarter[index]">
      <SmallCard class="small-card">
        <H2 class="name">Apple</H2><img src="" alt="Logo">
      <p>{{ data[data.length - 1] }} {{ quarter[data.length - 1] }}</p>
    </SmallCard>
      
    </div>

  </BaseCard>


</template>

<script>
import BaseCard from './components/BaseCard.vue';
import { stockService } from './services/stockService.js';
import SmallCard from  './components/SmallCard.vue';

export default {
  name: 'App',
  components: {
    BaseCard,
    SmallCard
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
  padding: 24px;
}

li {
  color:white;
}

.small-card {

}

.basecard-upside {
padding: 24px;
}

p {
    color: white;
}

h2 {
  color: white;
}
</style>
