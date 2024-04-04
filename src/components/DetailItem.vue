<!-- DetailItem.vue -->
<template>
  <div class="row">
    <div class="col-md-4">
      <label>{{ label }}</label>
    </div>
    <div class="col-md-8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String
  }
};
</script>
