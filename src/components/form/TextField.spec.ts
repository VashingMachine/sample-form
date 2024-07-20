import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TextField from './TextField.vue'

describe('TextField', () => {
  it('renders properly', () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: 'sampleInput'
      }
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('sampleInput')
  })

  it('emits input event', async () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: 'sampleInput'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('newInput')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['newInput'])
  })

  it('count vowels', async () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: 'sampleInput',
        countVowels: true
      }
    })

    const count = wrapper.find('span')
    expect(count.exists()).toBe(true)
    expect(count.text()).toBe('3')

    const input = wrapper.find('input')
    await input.setValue('ooaaaaaef')
    expect(count.text()).toBe('8')
  })

  it('emits delete event', async () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: 'sampleInput',
        allowDeletion: true
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted('delete-field')).toBeTruthy()
  })
})
