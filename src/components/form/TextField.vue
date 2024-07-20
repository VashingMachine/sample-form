<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  countVowels: {
    type: Boolean,
    default: false
  },
  highlight: {
    type: Boolean,
    default: false
  },
  allowDeletion: {
    type: Boolean,
    default: false
  }
})

defineEmits(['delete-field'])

const model = defineModel({
  type: String,
  default: ''
})

const vowelsCount = computed(() => {
  return model.value.split('').filter((char) => 'aeiou'.includes(char)).length
})
</script>

<template>
  <div>
    <input :class="props.highlight && 'highlight'" type="text" v-model="model" />
    <span v-if="props.countVowels"> {{ vowelsCount }}</span>
    <button class="delete" v-if="props.allowDeletion" @click="$emit('delete-field')">Delete</button>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  border-radius: 7px;
  border: 3px solid #d8a3a3;
  margin: 10px;
  font-size: 1.6rem;
}

div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  width: 150px;
  font-size: 1.6rem;
}

.highlight {
  background-color: green;
}
</style>
