<template>
  <fieldset class="form-group">
    <label>{{ label }}</label>
    <input 
      :type="type" 
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :readonly="readonly"
    />
  </fieldset>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],

}
</script>
