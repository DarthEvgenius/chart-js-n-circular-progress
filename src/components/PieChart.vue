<template>
  <div class="chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const props = defineProps<{
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart<'pie'> | null = null;

const chartData = ref<ChartData>({
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
    borderColor: [],
    borderWidth: 2
  }]
});

const updateChart = () => {
  chartData.value = {
    labels: props.data.map(item => item.name),
    datasets: [{
      data: props.data.map(item => item.value),
      backgroundColor: props.data.map(item => item.color),
      borderColor: props.data.map(item => '#ffffff'),
      borderWidth: 2
    }]
  };

  if (chart) {
    chart.data = chartData.value;
    chart.update();
  }
};

onMounted(() => {
  if (chartCanvas.value) {
    chart = new Chart(chartCanvas.value, {
      type: 'pie',
      data: chartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding:10,
              font: {
                size: 15
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }
  updateChart();
});

watch(() => props.data, updateChart, { deep: true });

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>

<style scoped lang='scss'>
.chart {
  max-width: 95vw;
  display: flex;justify-content: center;
}
</style>
