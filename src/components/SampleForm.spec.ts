import { describe, it, expect } from 'vitest'
import { fn } from '@vitest/spy'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import SampleForm from './SampleForm.vue'

function makeWrapper() {
  return mount(SampleForm, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: fn,
          stubActions: false
        })
      ]
    }
  })
}

describe('SampleForm', () => {
  it('renders properly', () => {
    const wrapper = makeWrapper()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'TextField' }).length).toBe(3)
    expect(wrapper.find('button.add').exists()).toBe(true)
  })

  it('adds text field', async () => {
    const wrapper = makeWrapper()

    const addButton = wrapper.find('button.add')

    await addButton.trigger('click')
    await expect(wrapper.findAllComponents({ name: 'TextField' }).length).toBe(4)

    await addButton.trigger('click')
    await expect(wrapper.findAllComponents({ name: 'TextField' }).length).toBe(5)
  })

  it('add text field - limit 10', async () => {
    const wrapper = makeWrapper()

    const addButton = wrapper.find('button.add')

    for (let i = 0; i < 8; i++) {
      await addButton.trigger('click')
    }

    expect(wrapper.findAllComponents({ name: 'TextField' }).length).toBe(11)
    expect(wrapper.find('button.add').exists()).toBe(false)
  })

  it('removes text field', async () => {
    const wrapper = makeWrapper()

    const addButton = wrapper.find('button.add')
    await addButton.trigger('click')
    await addButton.trigger('click')

    const textFields = wrapper.findAllComponents({ name: 'TextField' })
    expect(textFields.length).toBe(5)

    const deleteButton = textFields[1].find('button.delete')
    await deleteButton.trigger('click')

    expect(wrapper.findAllComponents({ name: 'TextField' }).length).toBe(4)
  })

  it('disalow complete fields removal', async () => {
    const wrapper = makeWrapper()

    let textFields = wrapper.findAllComponents({ name: 'TextField' })
    expect(textFields.length).toBe(3)
    const deleteButton = textFields[1].find('button.delete')
    await deleteButton.trigger('click')

    textFields = wrapper.findAllComponents({ name: 'TextField' })
    expect(textFields.length).toBe(2)

    expect(textFields[1].find('button.delete').exists()).toBe(false)
  })

  it('search text fields', async () => {
    const wrapper = makeWrapper()

    const searchInput = wrapper.findAllComponents({ name: 'TextField' })[0].find('input')
    await searchInput.setValue('llo')

    expect(
      wrapper.findAllComponents({ name: 'TextField' }).filter((field) => field.props()['highlight'])
        .length
    ).toBe(2)

    await searchInput.setValue('Not Found')
    expect(
      wrapper.findAllComponents({ name: 'TextField' }).filter((field) => field.props()['highlight'])
        .length
    ).toBe(0)

    const addButton = wrapper.find('button.add')
    await addButton.trigger('click')

    const newField = wrapper.findAllComponents({ name: 'TextField' })[3].find('input')
    await newField.setValue('Not Found')

    expect(
      wrapper.findAllComponents({ name: 'TextField' }).filter((field) => field.props()['highlight'])
        .length
    ).toBe(2)
  })
})
