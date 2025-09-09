<template>
  <div
    class="circular-progress"
    :style="{ width: `${size}px`, height: `${size}px` }">

    <svg
      :viewBox="viewBox"
      :class="['circular-progress__svg']"
      :style="{ transform: type === 'dashboard' ? 'rotate(-205deg)' : 'rotate(-90deg)' }"
    >
      <!-- Фоновая окружность -->
      <circle
        class="circular-progress__background"
        :cx="size / 2"
        :cy="size / 2"
        :r="normalizedRadius"
        :stroke-width="strokeWidth"
        fill="none"
        stroke-linecap="round" 
        :stroke-dasharray="strokeDasharray"
        stroke-dashoffset="0"
      />

      <!-- Окружность прогресса -->
      <circle
        class="circular-progress__fill"
        :cx="size / 2"
        :cy="size / 2"
        :r="normalizedRadius"
        :stroke-width="strokeWidth"
        fill="none"
        :stroke="statusColor"
        stroke-linecap="round" 
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset"
        :style="progressStyle"
      />
    </svg>
  
  <!-- Слот для контента в центре (иконка статуса, текст и т.д.) -->
    <div class="circular-progress__content">
      <slot :status="status" :progress="currentProgress">
        <!-- Fallback контент, например, иконки для статусов -->
        <span v-if="status === 'success'">✅</span>
        <span v-else-if="status === 'error'">❌</span>
        <span v-else-if="status === 'warning'">⚠️</span>
        <span v-else>{{ Math.round(currentProgress) }}%</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';


const {
  modelValue,
  status = 'in-progress',
  type = 'circle',
  size = 100,
  strokeWidth = 8,
  duration = 800,
} = defineProps<{
  // Текущее значение прогресса
  modelValue: number;
  status?: 'in-progress' | 'success' | 'warning' | 'error';
  type?: 'circle' | 'dashboard';
  size?: number;
  strokeWidth?: number;
  duration?: number;
}>();

// progress in range 0 - 100
const currentProgress = computed(() => {
  return Math.max(0, Math.min(100, modelValue))
});

// геометрические параметры
const viewBox = computed(() => `0 0 ${size} ${size}`);

const normalizedRadius = computed(() => {
  const center = size / 2;
  const scaleFactor = size / 100;
  const normalizedStrokeWidth = strokeWidth * scaleFactor;

  return center - normalizedStrokeWidth / 2;
});

const fullCircumference = computed(() => 2 * Math.PI * normalizedRadius.value);

// настройки dashboard
const arcAngle = 230;
const arcCircumference = computed(() => fullCircumference.value * (arcAngle / 360));

// Вычисляем dasharray
const strokeDasharray = computed(() => {
  if (type === 'circle') {
    return `${fullCircumference.value} ${fullCircumference.value}`;
  } else {
    return `${arcCircumference.value} ${fullCircumference.value}`;
  }
});

// Вычисляем dashoffset для прогресса
// Когда strokeDashoffset равен circumference, прогресс равен 0.
// Когда strokeDashoffset = 0, прогресс равен 100%
const strokeDashoffset = computed(() => {
  if (type === 'circle') {
    return fullCircumference.value - (currentProgress.value / 100) * fullCircumference.value;
  } else {
    return arcCircumference.value - (currentProgress.value / 100) * arcCircumference.value;
  }
});

//  цвет на основе прогресса (только для status='in-progress')
const progressColor = computed(() => {
  if (status !== 'in-progress') return;

  // HSL: H меняется от 0 (красный) до 120 (зеленый)
  const hue = (currentProgress.value / 100) * 120;
  return `hsl(${hue}, 65%, 50%)`;
});

// цвет на основе статуса
const statusColor = computed(() => {
  const statusPalette = {
    'success': 'hsl(142, 72%, 45%)',
    'warning': 'hsl(38, 92%, 50%)',
    'error': 'hsl(0, 84%, 60%)',
    'in-progress': progressColor.value
  };
  
  return statusPalette[status];
});

// Стиль для анимации перехода прогресса
const progressStyle = computed(() => ({
  'transition': `stroke-dashoffset ${duration}ms ease, stroke ${duration}ms ease`,
}));

</script>

<style scoped lang="scss">
.circular-progress {
  position: relative;
  display: inline-flex;

  &__svg {
    width: 100%;
    height: 100%;
    display: block;

    transition: transform 0.3s ease;
  }

  &__background {
    stroke: #e0e0e0;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.3rem;
  }
}
</style>
