<template>
  <header>
    <div class="placeholder"></div>
    <h1>The Magnificent Seven Companies</h1>
  </header>
  <main>

    <BaseCard class="basecard-upside">


      <div class="basecard-upside" v-for="(item, index) in 7" :key="quarter[index]">
        <SmallCard :index="index" class="small-card">
        </SmallCard>

      </div>

    </BaseCard>

    <div class="middle-diagramms">

      <BaseCard class="line-chart">
        <LineCharts>

        </LineCharts>
      </BaseCard>

      <BaseCard>
        <Doughnut>

        </Doughnut>
      </BaseCard>
    </div>

    <div class="bar-charts">
      <BaseCard>
        <HorizontalBarCharts>

        </HorizontalBarCharts>
      </BaseCard>

      <BaseCard>
        <HorizontalBarChartsPercent>

        </HorizontalBarChartsPercent>
      </BaseCard>

      <BaseCard>
        <VerticalBarCharts>

        </VerticalBarCharts>
      </BaseCard>

    </div>


  </main>



</template>

<script>
import BaseCard from './components/BaseCard.vue';
import SmallCard from './components/SmallCard.vue';
import LineCharts from './components/LineCharts.vue';
import Doughnut from './components/Doughnut.vue';
import HorizontalBarCharts from './components/HorizontalBarCharts.vue';
import HorizontalBarChartsPercent from './components/HorizontalBarChartsPercent.vue';
import VerticalBarCharts from './components/VerticalBarCharts.vue';


export default {
  name: 'App',
  components: {
    BaseCard,
    SmallCard,
    LineCharts,
    Doughnut,
    HorizontalBarCharts,
    HorizontalBarChartsPercent,
    VerticalBarCharts
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

}

.bar-charts {
  display: flex;
}

.middle-diagramms {
  display: flex;
  align-items: center;

}

li {
  color: white;
}

header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 32px;
}

main {
  padding: 96px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 64px;
}

.placeholder {
  background-color: #39DAFF;
  width: 96px;
  border-radius: 0 50px 50px 0;
  height: 32px;
}

.line-chart {
  width: 500px;
}

h1 {
  color: white;
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
