<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <div class="wrapper">
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
      <div class="main-panel">
        <top-navbar></top-navbar>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SideBar from './sidebarPlug/SideBar.vue';
  import SidebarLink from './sidebarPlug/SidebarLink.vue';

  import TopNavbar from './components/TopNavbar.vue';

export default {
  name: "app",
  components : {
    SideBar, SidebarLink,
    TopNavbar,   
  }
};
</script>

<style lang="scss">
  .vue-notifyjs.notifications{
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>