<!-- PagingButton.vue -->
<template>
  <div class="col-12 text-center">
    <div class="btn-group" role="group" aria-label="Basic outlined example">
      <button class="btn btn-success btn-sm" @click="changePage(1)" :disabled="modelValue === 1">
        &lt;&lt;
      </button>
      <button class="btn btn-success btn-sm" @click="changePage(modelValue-1)" :disabled="modelValue === 1">
        &lt;
      </button>             &nbsp;&nbsp;
      <button v-for="(index) in maxPage" :key="index" class="btn btn-success btn-sm" @click="changePage(index)">
        {{ index }}
      </button>            &nbsp;&nbsp;
      <button class="btn btn-success btn-sm" @click="changePage(modelValue+1)" :disabled="modelValue === maxPage">
        &gt;
      </button>
      <button class="btn btn-success btn-sm" @click="changePage(maxPage)" :disabled="modelValue === maxPage">
        &gt;&gt;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    maxPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(page) {
      this.$emit('update:modelValue', page);
    }
  }
};
</script>
