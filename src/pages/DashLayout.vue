<template>
  <div >
      <side-bar>
        <sidebar-link to="/">
          <p>Dashboard</p>
        </sidebar-link>
        <sidebar-link to="/u">
          <p>User list</p>
        </sidebar-link>
        <sidebar-link to="/v">
          <p>Customer list</p>
        </sidebar-link>
      </side-bar>
  </div>
</template>
<script>
  import SideBar from '../sidebarPlug/SideBar.vue';
  import SidebarLink from '../sidebarPlug/SidebarLink.vue';

export default {
  components:{
    SideBar, SidebarLink
  },
  computed : {

  },
  methods : {
    toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
  }
};

</script>