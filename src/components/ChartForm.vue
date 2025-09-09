<template>
  <div class="chart-form">
    <h3>Добвление сектора</h3>

    <form
      @submit.prevent="addSector"
      class="form"
    >
      <div class="form-group">
        <label for="name">Наименование:</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Введите название сектора"
        />
      </div>

      <div class="form-group">
        <label for="value">Значение:</label>
        <input
          id="value"
          v-model="form.value"
          type="number"
          min="1"
          required
          placeholder="Введите значение"
        />
      </div>

      <div class="form-group">
        <label for="color">Цвет:</label>

        <ChromePicker
          v-model="form.color"
          id="color"
          class="color-picker"
        />

      </div>

      <button type="submit" class="btn">
        {{ editingIndex !== null ? 'Обновить' : 'Добавить сектор' }}
      </button>
      
      <button 
        v-if="editingIndex !== null" 
        type="button" 
        @click="cancelEdit"
        class="btn-secondary"
      >
        Отмена
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ChromePicker } from 'vue-color'

interface Sector {
  name: string;
  value: number;
  color: string;
}

const emit = defineEmits<{
  (e: 'add', sector: Sector): void;
  (e: 'update', payload: { index: number; sector: Sector }): void;
}>();

const form = reactive({
  name: '',
  value: 1,
  color: '#ff6384'
});

const editingIndex = ref<number | null>(null);

const addSector = () => {
  const sector: Sector = {
    name: form.name,
    value: form.value,
    color: form.color
  };

  if (editingIndex.value !== null) {
    emit('update', { index: editingIndex.value, sector });
    editingIndex.value = null;
  } else {
    emit('add', sector);
  }

  resetForm();
};

const editSector = (index: number, sector: Sector) => {
  form.name = sector.name;
  form.value = sector.value;
  form.color = sector.color;
  editingIndex.value = index;
};

const cancelEdit = () => {
  editingIndex.value = null;
  resetForm();
};

const resetForm = () => {
  form.name = '';
  form.value = 1;
  form.color = '#ff6384';
};

defineExpose({
  editSector,
  cancelEdit
});
</script>

<style scoped lang="scss">
.chart-form {
  width: 100%;
  
  background: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-xl);
}

h3 {
  margin-bottom: var(--gap-l);
  color: var(--primary-color);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--gap-l);
}

.form-group {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  border: 1px solid var(--bd-color);
  border-radius: var(--bd-rad);

  .color-picker {
    width: 100%;
    box-shadow: none;
    
    :deep(.saturation) {
      border-radius: var(--bd-rad);
      overflow: hidden;
    }
  }
}

label {
  color: var(--secondary-color);
  font-size: var(--fz-sm);
  font-weight: 400;
}

input {
  padding: var(--spacing-sm);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-base);

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
}

.color-input {
  width: 60px;
  height: 40px;
  padding: 0;
  border: none;
}

.color-value {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

.btn-primary, .btn-secondary {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-primary {
  background: var(--accent-color);
  color: white;

  &:hover {
    background: var(--primary-color);
    transform: translateY(-1px);
  }
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-secondary);

  &:hover {
    background: var(--border-color);
  }
}

</style>