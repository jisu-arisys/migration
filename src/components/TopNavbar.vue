<template>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">{{routeName}}</a>
          <button type="button"
                  class="navbar-toggler navbar-toggler-right"
                  :class="{toggled: $sidebar.showSidebar}"
                  aria-controls="navigation-index"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  >
            <span class="navbar-toggler-bar burger-lines"></span>
            <span class="navbar-toggler-bar burger-lines"></span>
            <span class="navbar-toggler-bar burger-lines"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav ml-auto" >
              <li v-if="isLoggedIn" class="nav-item">
                <a >{{ userId }}
                </a>
                <a @click="logOut" class="nav-link">
                  Log out
                </a>
              </li>
              <li v-else class="nav-item" >
                <strong >{{ userId }}
                </strong>
                <a @click="logOut" class="nav-link">
                  <strong>Sign In</strong>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route.name
        return name;
      },
      isLoggedIn() {
        // console.log("isLoggedIn"+this.$store.getters.isLoggedIn);
        // return this.$store.getters.isLoggedIn;
        return true;
      },
      userId() {
        // return this.$store.getters.userId;
        return 'user';
      },
    },
    data () {
      return {
        activeNotifications: false,
      }
    },
    methods: {
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logOut(){
        // this.$store.dispatch('logout');
        this.$router.push("/login");
      },
    }
  }

</script>
<style>

</style>
