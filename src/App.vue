<template>
  <BaseCard class="basecard-upside">

  
    <div class="basecard-upside"  v-for="(item, index) in 1" :key="quarter[index]"  >
      <SmallCard class="small-card">
    </SmallCard>
      
    </div>

  </BaseCard>


</template>

<script>
import BaseCard from './components/BaseCard.vue';
import SmallCard from  './components/SmallCard.vue';

export default {
  name: 'App',
  components: {
    BaseCard,
    SmallCard
  },
  data() {
    return {
      quarter: []
    };
  },
};
</script>

<style>
@font-face {
  font-family: 'rubik';
  src: url(/src/assets/fonts/rubik-regular.ttf);
}

* {
  margin: 0;
  font-family: rubik;
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
