<template>
  <li class="router-link-active router-link-exact-active">
    <component :is="tag"
    @click="hideSidebar"
    v-bind="$attrs"
    >
    <a class="nav-link" v-bind="$attrs" >
      <slot>
        <i v-if="link.icon" :class="link.icon"></i>
        <p>{{link.name}}</p>
      </slot>
    </a>
  </component>
</li>
</template>
<script>
  export default {
    // inheritAttrs: true,
    inject: {
      autoClose: {
        default: true
      }
    },
    props: {
      link: {
        type: [String, Object],
        default: () => {
          return {
            name: '',
            path: '',
            icon: ''
          }
        }
      },
      tag: {
        type: String,
        default: 'router-link'
        // default: 'li'
      }
    },
    methods: {
      hideSidebar () {
        if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }
</script>
<style>
</style>
