<template>
    <canvas ref="doughnutCanvas"></canvas>
</template>

<script>
import {
    Chart,
    ArcElement,
    DoughnutController,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { stockService } from '@/services/stockService';

Chart.register(ArcElement, DoughnutController, Tooltip, Legend, Title);

export default {
    name: 'RevenueBreakdown',
    data() {
        return {
            dataAll: []
        }
    },
    async mounted() {
        const ctx = this.$refs.doughnutCanvas.getContext('2d');
        this.dataAll = await stockService.renderData();


        const latestIndex = this.dataAll[0].revenue.length - 1;

        const labels = this.dataAll.map(c => c.name);
        const data = this.dataAll.map(c => {
            let number = Number(c.revenue[latestIndex].replace(',', '.'))
            return number.toFixed(2)
        }


        );

        const backgroundColors = ['#39DAFF', '#31BFE2', '#29A5C5', '#218AA8', '#196F8C', '#11546F', '#093A52'];

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data,
                        backgroundColor: backgroundColors,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                plugins: {
                    datalabels: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Revenue Breakdown Magnificent Seven',
                        color: '#fff',
                        textAlign: 'left',
                        align: 'start', // = linksbündig
                        font: {
                            size: 24,
                            weight: 'bold'
                        },
                        padding: {
                            bottom: 32
                        }
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#fff',
                            font: {
                                size: 14
                            }
                        }
                    }
                }
            }
        });
    }
};
</script>

<style scoped>
canvas {
    height: 500px;
}
</style>
