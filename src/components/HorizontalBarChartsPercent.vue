<template>
    <canvas ref="horizontalBarChartsPercent"></canvas>
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
    name: 'HorizontalBarChartsPercent',
    data() {
        return {
            dataAll: [],
            labels: [],
            data: [],
            ctx: null
        };
    },
    async mounted() {
        this.ctx = this.$refs.horizontalBarChartsPercent.getContext('2d');
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
                let grossMargin = company.grossMargin[company.grossMargin.length - 1];
                let number = Number(grossMargin.replace("%", ""))

                return {
                    name: company.name,
                    grossMargin: number
                };
            });

            combined.sort((a, b) => b.grossMargin - a.grossMargin);
            this.labels = combined.map(c => c.name);
            this.data = combined.map(c => c.grossMargin);

            console.log("Percent chart data:", this.data);
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
                                color: '#9E9E9E',
                                borderDash: [4, 4],
                                lineWidth: 1
                            },
                            ticks: {
                                color: '#fff'
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
                            formatter: (value) => value + '%'
                        },
                        title: {
                            display: true,
                            text: 'Gross Margin in % LQ',
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
