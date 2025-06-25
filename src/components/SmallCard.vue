<template>
    <div class="card" v-if="dataAll[0]">
        
        <div class="card-header">
            <img src="@/assets/img/apple.png" alt="">
            <h2>{{ dataAll[0].name }}
            </h2>

        </div>
        <p>Revenue {{ dataAll[0].quarter[16] }}</p>
        <div class="reveneu">
            <span>{{ dataAll[0].revenue[16] }}</span>
            <div class="growth">
                <span>+1.06</span>
                <span>2.67%</span>
            </div>
        </div>
        <p>In Bill USD</p>
    </div>

</template>

<script>
import { stockService } from '@/services/stockService';

export default {
    name: 'SmallCard',
    data() {
        return {
            dataAll : [],
        }
    },
    async created() {
        this.dataAll = await stockService.renderData();
        console.log("Das ist das array: ", this.dataAll);


    }
}



</script>

<style scoped>
.card {
    background-color: #011F35;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 24px;
}

.card-header {
    display: flex;
}

.reveneu {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 21px;
}

.growth {
    display: flex;
    flex-direction: column;
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
}
</style>
