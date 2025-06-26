<template>
    <div class="card" v-if="dataAll[index]">

        <div class="card-header">
            <img :src="getImageUrl()" alt="">
            <h2>{{ dataAll[index].name }}
            </h2>

        </div>
        <p>Revenue {{ dataAll[index].quarter[16] }}</p>
        <div class="reveneu">
            <span>{{ dataAll[index].revenue[16].replace(",", ".") }}</span>
            <div class="growth">
                <span :class="getLastGrowth(index) > 0 ? 'growth-green' : 'growth-red'">{{ getLastGrowth(index) }}</span>
                <span>{{ getLastGrowthPercent(index) }}</span>
            </div>
        </div>
        <p class="in-bill">In Bill USD</p>
    </div>

</template>

<script>
import { stockService } from '@/services/stockService';

export default {
    name: 'SmallCard',
    props: {
        index: {
            type: Number
        }
    },
    data() {
        return {
            dataAll: [],
        }
    },
    async created() {
        this.dataAll = await stockService.renderData();
        console.log("Das ist das array: ", this.dataAll);


    },
    methods: {
        getLastGrowth(index) {
            let numberA = this.dataAll[index].revenue[16];
            let numberB = this.dataAll[index].revenue[15];
            numberA = Number(numberA.replace(',', '.'));
            numberB = Number(numberB.replace(',', '.'));
            return (numberA - numberB).toFixed(2)
        },
        getLastGrowthPercent(index) {
            let numberA = this.dataAll[index].revenue[16];
            let numberB = this.dataAll[index].revenue[15];
            numberA = Number(numberA.replace(',', '.'));
            numberB = Number(numberB.replace(',', '.'));
            let different = numberA - numberB;
            let percent = ((different / numberB) * 100).toFixed(2);
            return percent + " %";
        },
        getImageUrl() {
            const fileName = this.dataAll[0].name.toLowerCase();
            return require(`@/assets/img/${fileName}.png`);

        }
    }
}



</script>

<style scoped>
.card {
    background-color: #011F35;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
    width: 173px;
    height: 143px;
    gap: 16px;
}

.card-header {
    display: flex;
    align-items: center;
}

.growth-green {
    color: green;
}

.growth-red {
    color: red;
}

.card-header img {
    object-fit: contain;
    height: 20px;
    width: 20px;
    margin-right: 12px;
}


.reveneu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    gap: 8px;


}

.reveneu span {
    font-size: 24px;
}

.growth {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.growth span {
    font-size: 16px;
}

h2 {
    color: white;
}

span {
    color: white;
}

p {
    color: white;
    font-size: 21px;
}

.in-bill {
    font-size: 14px;
}
</style>
