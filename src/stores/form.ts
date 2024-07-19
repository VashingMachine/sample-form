import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'

declare type TextField = {
  id: string
  value: string
}

export const useFormStore = defineStore('form', () => {
  const textFields = ref<TextField[]>([
    { id: crypto.randomUUID(), value: 'Hello' },
    { id: crypto.randomUUID(), value: 'World' }
  ])

  const search = ref('')

  const addTextField = () => {
    const id = crypto.randomUUID()
    textFields.value.push({ id, value: '' })
  }

  const removeTextField = (id: string) => {
    const index = textFields.value.findIndex((field) => field.id === id)
    textFields.value.splice(index, 1)
  }

  const highlighted: Ref<Record<string, boolean>> = computed(() => {
    if (search.value === '') return {}

    return textFields.value
      .filter((field) => field.value.includes(search.value))
      .map((field) => field.id)
      .reduce((acc, id) => ({ ...acc, [id]: true }), {})
  })

  return { textFields, search, highlighted, addTextField, removeTextField }
})
