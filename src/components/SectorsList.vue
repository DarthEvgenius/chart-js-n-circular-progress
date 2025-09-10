<template>
  <div class="sectors-list">
    <div class="sectors">
      <div 
        v-for="(sector, index) in sectors" 
        :key="index" 
        class="sector-item"
      >
        <div class="sector-info">
          <span class="sector-name">{{ sector.name }}</span>

          <span class="sector-percentage">
            {{ calculatePercentage(sector.value) }}%
          </span>

          <span class="sector-color" :style="{ backgroundColor: sector.color }"></span>
        </div>
        
        <div class="sector-actions">
          <button
            @click="editSector(index)"
            class="btn-edit"
            title="Редактировать"
          >
          </button>

          <button
            @click="removeSector(index)"
            class="btn-delete"
            title="Удалить"
          >
          </button>
        </div>
      </div>

      <div v-if="sectors.length === 0" class="empty-state">
        Нет добавленных секторов
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ISector } from '@/types';


const props = defineProps<{
  sectors: ISector[];
}>();

const emit = defineEmits<{
  (e: 'edit', index: number): void;
  (e: 'remove', index: number): void;
}>();

const totalValue = computed(() => {
  return props.sectors.reduce((sum, sector) => sum + sector.value, 0);
});

const calculatePercentage = (value: number) => {
  if (totalValue.value === 0) return 0;
  return ((value / totalValue.value) * 100).toFixed(1);
};

const editSector = (index: number) => {
  emit('edit', index);
};

const removeSector = (index: number) => {
  if (confirm('Вы уверены, что хотите удалить этот сектор?')) {
    emit('remove', index);
  }
};
</script>

<style scoped lang="scss">
.sectors-list {
  background: var(--bg-primary);
}

.sectors {
  display: flex;
  flex-direction: column;
  gap: var(--gap-s);
}

.sector-item {
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background: var(--bg-color);
  border-radius: var(--bd-rad);
}

.sector-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.sector-color {
  margin-left: 1.5rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.sector-name {
  font-weight: 400;
  min-width: 120px;
}

.sector-percentage {
  padding-inline: 1.5em;
  width: calc(4ch + 3em);
  border-left: 2px solid var(--bd-color);
  border-right: 2px solid var(--bd-color);
}

.sector-actions {
  display: flex;
  gap: var(--gap-l);
}

.btn-edit, .btn-delete {
  width: 24px;
  height: 24px;

  background-repeat: no-repeat;
  background-position: center;

  cursor: pointer;
  transition: transform var(--transition-time);

  &:hover {
    transform: scale(1.1);
  }
}

.btn-edit {
  background-image: url('/public/pen.svg');
}

.btn-delete {
  background-image: url('/public/trash.svg');
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-muted);
  font-style: italic;
}
</style>