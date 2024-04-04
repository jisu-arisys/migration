<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <div class="wrapper">
      <side-bar :sidebarLinks="sidebarLinks">
      </side-bar>
      <div class="main-panel">
        <top-navbar></top-navbar>
        <div class="content">
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </div>
        <content-footer></content-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import SideBar from './sidebarPlug/SideBar.vue';
  import TopNavbar from './components/TopNavbar.vue';
  import ContentFooter from './components/ContentFooter.vue';

export default {
  name: "app",
  components : {
    SideBar,
    TopNavbar, ContentFooter
  },
  data(){
    return {
      sidebarLinks : [
        { name: 'Dashboard', icon: 'nc-icon nc-air-baloon', path: '/' },
        { name: 'User', icon: 'nc-icon nc-circle-09', path: '/u' },
        { name: 'Vdn', icon: 'nc-icon nc-bank', path: '/v' },
        { name: 'User list', icon: 'nc-icon nc-circle-09', path: '/userlist' },
        { name: 'Customer list', icon: 'nc-icon nc-bank', path: '/customerlist' },
        { name: 'Group list', icon: 'nc-icon nc-time-alarm', path: '/grouplist' },
        // { name: 'Test list', icon: 'nc-icon nc-bulb-63', path: '/testlist' },
        // { name: 'Test Result', icon: 'nc-icon nc-bell-55', path: '/testresult' },
    ]
    }
  },
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