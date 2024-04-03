<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" @click="handleColumnClick(item)">{{itemValue(item, column)}}</td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'table-basic',
    props: {
      columns: Array,
      data: Array
    },
    methods: {
      itemValue (item, column) {
        return item[column]
      },
      handleColumnClick(item) {
      this.$emit('handle', item);
      }
    }
  }
</script>
<style>
</style>
