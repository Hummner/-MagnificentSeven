<template>
    <canvas ref="horizontalChartCanvas"></canvas>
</template>

<script>
import {
    Chart,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { stockService } from '@/services/stockService';

Chart.register(Tooltip, Legend, Title);

export default {
    name: 'HorizontalBarCharts',
    data() {
        return {
            dataAll: []
        }
    },
    async mounted() {
        const ctx = this.$refs.horizontalChartCanvas.getContext('2d');
        this.dataAll = await stockService.renderData();

              data: company.revenue
                .slice(-13) // nur die letzten 13 Werte
                .map(r => parseFloat(r.replace(',', ''))),


        

        const labels = this.dataAll.map(c => c.name);
        const data = this.dataAll.slice(-12).map(c =>
            parseFloat(c.incomeNetto[latestIndex].replace(',', ''))
        );

        const backgroundColors = ['#00ffff', '#00ccff', '#00aaff', '#0088ff', '#0066ff', '#0044ff', '#0022ff']

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Net Income TTM',
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
