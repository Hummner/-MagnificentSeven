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
        const data = this.dataAll.map(c =>
            parseFloat(c.revenue[latestIndex].replace(',', ''))
        );

        const backgroundColors = ['#00ffff', '#00ccff', '#00aaff', '#0088ff', '#0066ff', '#0044ff', '#0022ff']

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
