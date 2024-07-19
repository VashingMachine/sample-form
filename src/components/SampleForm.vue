<script setup lang="ts">
import TextField from '@/components/form/TextField.vue'

import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'

const { textFields, search, highlighted } = storeToRefs(useFormStore())
const { addTextField, removeTextField } = useFormStore()
</script>

<template>
  <TextField class="search" v-model="search" />
  <div class="container">
    <div>
      <TextField
        v-for="textField in textFields"
        :key="textField.id"
        v-model="textField.value"
        :count-vowels="true"
        :highlight="!!highlighted[textField.id]"
        :allow-deletion="textFields.length > 1"
        @delete-field="removeTextField(textField.id)"
      />
    </div>
  </div>
  <button v-if="textFields.length <= 10" @click="addTextField">Add Text Field</button>
</template>

<style scoped>
.container {
  display: grid;
  gap: 1rem;
}

.search {
  position: relative;
  margin-bottom: 50px;
}

.search::before {
  content: '🔍';
  font-size: 30px;
  margin-left: 10px;
}
</style>
