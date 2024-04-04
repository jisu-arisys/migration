<template>
  <div class="container">
    <h3>All Users</h3>
    <div v-if="message" class="alert alert-success">{{ this.message }}</div>
    <div class="row">
      <div class="col-11">
      <button class="btn btn-success float-end" v-on:click="addUser()">Add</button>
      </div>
    </div>
    <div class="container">
      <table class="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" v-bind:key="user.id">
            
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.emailId }}</td>
              <td>
              <button class="btn btn-warning" v-on:click="updateUser(user.id)">
                  Update
                </button>
              </td>
              <td>
               <button class="btn btn-danger" v-on:click="deleteUser(user.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <page-button :max-page="maxPage" v-model="currentPage" ></page-button>
      </div>
    </div>
  </template>
  <script>
  import UserDataService from "../service/UserDataService";
  
  export default {
    name: "Users",
    data() {
      return {
        datas: [],
        users: [],
        message: "",
        filterOrder: {
          keyword:""
        },
        pageSize:2,
        currentPage:1,
      };
    },
    watch: {
      currentPage: {
        handler() { this.updateTableData(); },
        immediate: true
      },
      filterOrder: {
        handler(){          
          this.currentPage=1;
          this.updateTableData();
        },
        deep: true,
      },
    },
    computed:{
      maxPage(){
        return Math.ceil(this.datas.length / this.pageSize);
      },
      searchedData() {
        //종속성 : tableData, filterOrder.keyword
        let keywords = [this.filterOrder.keyword];
        const filterProps = ['firstName', 'lastName', 'emailId'];
        return this.$filter.applySearchFilters(this.datas, keywords, filterProps);
      },
      paginatedData() {
        console.log(this.$filter.applyPaginatedData(this.searchedData, this.currentPage, this.pageSize));
        return this.$filter.applyPaginatedData(this.searchedData, this.currentPage, this.pageSize);
      },
    },
    methods : {
      updateTableData(){
        this.users = this.paginatedData;
      },
      refreshUsers() {
        UserDataService.retrieveAllUsers().then((res) => {
          this.datas = res.data;
          this.updateTableData();
        });
      },
      addUser() {
        this.$router.push("/user/-1");
      },
      updateUser(id) {
        this.$router.push(`/user/${id}`);
      },
      deleteUser(id) {
        UserDataService.deleteUser(id).then(() => {
          this.refreshUsers();
        });
      },
    },
    created() {
      this.refreshUsers();
    },
    mounted() {
      this.updateTableData();
    }
  };
  </script>