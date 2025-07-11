<template>
    <canvas ref="horizontalChartCanvas"></canvas>
</template>

<script>
import {
    BarController,
    Chart,
    Tooltip,
    Legend,
    Title,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { stockService } from '@/services/stockService';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default {
    name: 'HorizontalBarCharts',
    data() {
        return {
            dataAll: [],
            labels: [],
            data: [],
            ctx: null
        };
    },
    async mounted() {
        this.ctx = this.$refs.horizontalChartCanvas.getContext('2d');
        await this.loadData();
        this.prepareChartData();
        this.renderChart();
    },
    methods: {
        async loadData() {
            this.dataAll = await stockService.renderData();
            console.log("Loaded data:", this.dataAll);
        },
        prepareChartData() {
            const combined = this.dataAll.map(company => {
                let ttm = company.incomeNetto.slice(-4).map(i => Number(i.replace(",", "") / 1000));
                let sum = ttm.reduce((a, b) => a + b, 0);
                let newSum = Math.round(sum * 100) / 100;
                return {
                    name: company.name,
                    income: newSum
                };
            });

            combined.sort((a, b) => b.income - a.income);
            this.labels = combined.map(c => c.name);
            this.data = combined.map(c => c.income);

            console.log("Prepared chart data:", this.data);
        },
        renderChart() {
            const backgroundColors = ['#39DAFF', '#31BFE2', '#29A5C5', '#218AA8', '#196F8C', '#11546F', '#093A52'];

            new Chart(this.ctx, {
                type: 'bar',
                data: {
                    labels: this.labels,
                    datasets: [{
                        data: this.data,
                        backgroundColor: backgroundColors,
                        borderWidth: 2,
                        borderColor: "#ffffff"
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            grid: {
                                display: true,
                                color: '#444',
                                borderDash: [4, 4],
                                lineWidth: 1
                            },
                            ticks: {
                                color: '#9E9E9E'
                            }
                        },
                        y: {
                            grid: {
                                display: true,
                                color: '#9E9E9E'
                            },
                            ticks: {
                                color: '#fff'
                            }
                        }
                    },
                    plugins: {
                        datalabels: {
                            display: true,
                            color: '#fff',
                            anchor: 'end',
                            align: 'right',
                        },
                        title: {
                            display: true,
                            text: 'Net Income TTM',
                            color: '#fff',
                            textAlign: 'left',
                            align: 'start',
                            font: {
                                size: 24,
                                weight: 'bold'
                            },
                            padding: {
                                bottom: 32
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
canvas {
    height: 500px;
}
</style>
