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
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ChartDataLabels);

export default {
    name: 'HorizontalBarChartsPercent',
    data() {
        return {
            dataAll: [],
            labels: [],
            growthQ1: [],
            growthQ2: [],
            growthQ3: [],
            growthQ4: [],
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
            const quarters = this.dataAll.map(company => {
                let lastFiveQuerter = company.revenue.slice(-5);
                lastFiveQuerter = lastFiveQuerter.map(rev => {
                    let numberFromString = Number(rev.replace(",", "."))
                    return numberFromString
                });
                return { name: company.name, quarters: lastFiveQuerter };
            });

            const quartersInPercent = quarters.map((company) => {
                const revenues = company.quarters;

                const qoqGrowthArray = revenues.map((rev, index) => {
                    if (index === 0) return null; // kein vorheriges Quartal zum Vergleichen
                    const prev = revenues[index - 1];
                    if (prev === 0 || isNaN(prev)) return null;
                    const growth = ((rev - prev) / prev) * 100;
                    return Number(growth.toFixed(2));
                });

                return { name: company.name, quarters: qoqGrowthArray.slice(-4) };
            })

            this.growthQ1 = quartersInPercent.map(c => c.quarters[0])
            this.growthQ2 = quartersInPercent.map(c => c.quarters[1])
            this.growthQ3 = quartersInPercent.map(c => c.quarters[2])
            this.growthQ4 = quartersInPercent.map(c => c.quarters[3])
            this.labels = this.dataAll.map(c => c.name)

            console.log("Percent Yoy", this.growthQ1);
        },
        renderChart() {

            new Chart(this.ctx, {
                type: 'bar',
                data: {
                    labels: this.labels,
                    datasets: [{
                        label: "24Q2",
                        data: this.growthQ1,
                        backgroundColor: '#218AA8',
                        borderWidth: 2,
                        borderColor: "#ffffff"
                    },
                    {
                        label: "24Q3",
                        data: this.growthQ2,
                        backgroundColor: '#29A5C5',
                        borderWidth: 2,
                        borderColor: "#ffffff"
                    },
                    {
                        label: "24Q4",
                        data: this.growthQ3,
                        backgroundColor: '#31BFE2',
                        borderWidth: 2,
                        borderColor: "#ffffff"
                    },
                    {
                        label: "25Q1",
                        data: this.growthQ4,
                        backgroundColor: '#39DAFF',
                        borderWidth: 2,
                        borderColor: "#ffffff"
                    },

                    ]
                },
                options: {
                    datasets: {
                        bar: {
                            categoryPercentage: 1.0, // nimmt die ganze Kategoriebreite
                            barPercentage: 1,      // nimmt die ganze Balkenbreite
                            // alternativ:
                            barThickness: 20
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
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
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Revenue Growth in % YoY',
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
    }
};
</script>

<style scoped>
canvas {
    height: 500px;
}
</style>