// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useFormStore } from './form'
import { beforeEach, describe, expect, it } from 'vitest'

const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

describe('Form Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('initializes with two text fields', () => {
    const store = useFormStore()

    expect(store.textFields).toHaveLength(2)
    expect(store.textFields[0].value).toBe('Hello')
    expect(store.textFields[1].value).toBe('World')

    store.textFields.forEach((field) => {
      expect(field.id).toMatch(uuidRegex)
    })
  })

  it('adds text field', () => {
    const store = useFormStore()

    expect(store.textFields).toHaveLength(2)
    store.addTextField()
    expect(store.textFields).toHaveLength(3)

    store.textFields.forEach((field) => {
      expect(field.id).toMatch(uuidRegex)
    })
  })

  it('remove text field', () => {
    const store = useFormStore()

    expect(store.textFields).toHaveLength(2)
    const delID = store.textFields[0].id

    store.removeTextField(delID)
    expect(store.textFields).toHaveLength(1)
    expect(store.textFields[0].id).not.toBe(delID)
  })

  it('highlighted fields', () => {
    const store = useFormStore()

    store.search = 'Hello'
    expect(store.highlighted).toEqual({ [store.textFields[0].id]: true })

    store.search = 'World'
    expect(store.highlighted).toEqual({ [store.textFields[1].id]: true })

    store.search = 'Not Found'
    expect(store.highlighted).toEqual({})
  })
})
