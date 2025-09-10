<template>
  <div class="chart-page">
    <h1 class="chart-page__title">
      Круговая диаграмма
    </h1>
    
    <div class="chart-layout">
      <div class="controls-side">        
        <SectorsList
          :sectors="sectors"
          @edit="editSector"
          @remove="removeSector"
        />

        <button
          class="btn"
          @click="openDialog"
        >
          Добавить сектор
        </button>
      </div>

      <div class="chart-side">
        <PieChart :data="sectors" />
      </div>

      <div
        v-if="isDialogOpen"
        class="dialog-overlay"
        @click="closeDialog"
      >
        <div
          class="dialog"
          @click.stop
        >
          <div class="dialog__header">
            <h2 class="dialog__title">
              {{ editingIndex !== null ? 'Редактировать сектор' : 'Добавить сектор' }}
            </h2>

            <button class="dialog__close" @click="closeDialog">
              &times;
            </button>
          </div>

          <div class="dialog__content">
            <ChartForm
              ref="formRef"
              :editingSector
              :editingIndex
              @add="addSector"
              @update="updateSector"
              @cancel="closeDialog"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PieChart from '../components/PieChart.vue';
import ChartForm from '../components/ChartForm.vue';
import SectorsList from '../components/SectorsList.vue';
import type { ISector } from '@/types';


const sectors = ref<ISector[]>([
  { name: 'Сектор-1', value: 25, color: '#FF6384' },
  { name: 'Сектор-2', value: 25, color: '#FFCD56' },
  { name: 'Сектор-3', value: 25, color: '#4BC0C0' }
]);

const formRef = ref<InstanceType<typeof ChartForm> | null>(null);
const isDialogOpen = ref(false);
const editingIndex = ref<number | null>(null);

const editingSector = computed(() => editingIndex.value !== null ? sectors.value[editingIndex.value] : null)

const openDialog = () => {
  isDialogOpen.value = true;
  editingIndex.value = null;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  editingIndex.value = null;
};

const addSector = (sector: ISector) => {
  sectors.value.push(sector);
  closeDialog()
};

const updateSector = (payload: { index: number; sector: ISector }) => {
  sectors.value[payload.index] = payload.sector;
  closeDialog()
};


const editSector = (index: number) => {
  editingIndex.value = index;
  isDialogOpen.value = true;
};

const removeSector = (index: number) => {
  sectors.value.splice(index, 1);
};
</script>

<style scoped lang="scss">
.chart-page {
  padding-inline: 1rem;
  display: grid;
  row-gap: 2.5rem;

  &__title {
    padding-bottom: 0.95em;
    text-align: left;
    font-size: clamp(1.4rem, 0.5rem + 3vw, 2rem);
    font-weight: 600;
    border-bottom: 1px solid var(--bd-color);
  }
}

.chart-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.chart-side {
  width: 500px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
}

.controls-side {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

// Диалоговое окно
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);

  animation: fadeIn 0.2s ease;
}

.dialog {
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;

  background: white;
  border-radius: var(--bd-rad);
  overflow: hidden;
  animation: slideIn 0.3s ease;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid var(--border-color);
  }

  &__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    
    padding: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--secondary-color);

    transition: color var(--transition-time);

    &:hover {
      color: var(--text-primary);
    }
  }

  &__content {
    padding: 1.5rem;
    overflow-y: auto;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-1rem) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>