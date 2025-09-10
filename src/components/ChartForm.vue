<template>
  <div class="chart-form">
    <h3>Добвление сектора</h3>

    <form
      @submit.prevent="handleSubmit"
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
        <div
          class="form-group color-group"
          :style="{ '--color': form.color }"
        >
          <label for="color">Цвет:</label>

          <input
            id="value"
            v-model="form.color"
            type="text"
            disabled
          />
        </div>

        <ChromePicker
          v-model="form.color"
          id="color"
          class="color-picker"
        />
      </div>

      <button
        type="submit"
        class="btn"
      >
        {{ editingIndex !== null ? 'Обновить' : 'Добавить сектор' }}
      </button>
      
      <button 
        v-if="editingIndex !== null" 
        type="button" 
        @click="handleCancel"
        class="btn btn-secondary"
      >
        Отмена
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import { ChromePicker } from 'vue-color'
import type { ISector } from '@/types';

const emit = defineEmits<{
  (e: 'add', sector: ISector): void;
  (e: 'update', payload: { index: number; sector: ISector }): void;
  (e: 'cancel'): void;
}>();

const { editingSector, editingIndex } = defineProps<{
  editingSector: ISector | null;
  editingIndex: number | null
}>()



const form = reactive<ISector>({
  name: '',
  value: 1,
  color: '#ff6384'
});


const handleSubmit = () => {
  const sector: ISector = {
    name: form.name,
    value: form.value,
    color: form.color
  };

  if (editingSector !== null && editingIndex !== null) {
    emit('update', { index: editingIndex, sector });
  } else {
    emit('add', sector);
  }
};

const handleCancel = () => {
  emit('cancel');
  resetForm();
};


const resetForm = () => {
  form.name = '';
  form.value = 1;
  form.color = '#ff6384';
};


watchEffect(() => {
  if (editingSector) {
    Object.assign(form, editingSector)
  } else {
    resetForm()
  }
})

</script>

<style scoped lang="scss">
.chart-form {
  width: 100%;
  
  background: var(--bg-primary);
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
  border: 1px solid var(--bd-color);
  border-radius: var(--bd-rad);

  .color-group {
    margin-bottom: 10px;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: var(--color);
      
      position: absolute;
      right: 1rem;
      bottom: 50%;
      transform: translateY(50%);
      z-index: 10;
    }
  }
  
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

.color-input {
  width: 60px;
  height: 40px;
  padding: 0;
  border: none;
}

.btn-secondary {
  --bg: var(--primary-color);
}
</style>
