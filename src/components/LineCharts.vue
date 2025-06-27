<template>
    <canvas ref="chartCanvas"></canvas>
</template>

<script>
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js';
import { stockService } from '@/services/stockService';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default {
    name: 'LineChart',
    data() {
        return {
            colors: ['#00ffff', '#00ccff', '#00aaff', '#0088ff', '#0066ff', '#0044ff', '#0022ff'],
            dataAll: []
        };
    },
    async mounted() {
        const ctx = this.$refs.chartCanvas.getContext('2d');
        this.dataAll = await stockService.renderData();

        const datasets = this.dataAll.map((company, i) => ({
            label: company.name,
            data: company.revenue
                .slice(-13) // nur die letzten 13 Werte
                .map(r => parseFloat(r.replace(',', ''))),
            borderColor: this.colors[i % this.colors.length],
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.3
        }));

        console.log(datasets);


        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["22Q1", "22Q2", "22Q3", "22Q4", "23Q1", "23Q2", "23Q3", "23Q4", "24Q1", "24Q2", "24Q3", "24Q4", "25Q1"],
                datasets
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#fff'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Revenue last 3 years',
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
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#ccc',
                            padding: 8,
                            rotation: 45           // Drehen der Beschriftung
                        },
                        grid: { color: '#444' },

                    },
                    y: {
                        ticks: { color: '#ccc' },
                        grid: { color: '#444' },
                        beginAtZero: true
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
    width: 500px;
}
</style>