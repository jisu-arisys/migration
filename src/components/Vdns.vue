<template>
    <div class="container">
      <h3>All Vdns</h3>
      <div v-if="message" class="alert alert-success">{{ this.message }}</div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>

              <th>Vdn Number</th>
              <th>Vdn Name</th>
              <th>Update At</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vdn in vdns" v-bind:key="vdn.id">
            
              <td>{{ vdn.vdnNum }}</td>
              <td>{{ vdn.vdnName }}</td>
              <td>{{ vdn.updateAt }}</td>
              <td>
              <button class="btn btn-warning" v-on:click="updateVdn(vdn.id)">
                  Update
                </button>
              </td>
              <td>
               <button class="btn btn-danger" v-on:click="deleteVdn(vdn.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <button class="btn btn-success" v-on:click="addVdn()">Add</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import VdnDataService from "../service/VdnDataService";
  
  export default {
    name: "Vdns",
    data() {
      return {
        vdns: [],
        message: "",
      };
    },
    methods: {
      refreshVdns() {
        VdnDataService.retrieveAllVdns().then((res) => {
          this.vdns = res.data;
        });
      },
      addVdn() {
        this.$router.push(`/vdn/-1`);
      },
      updateVdn(id) {
        this.$router.push(`/vdn/${id}`);
      },
      deleteVdn(id) {
        VdnDataService.deleteVdn(id).then(() => {
          this.refreshVdns();
        });
      },
    },
    created() {
      this.refreshVdns();
    },
  };
  </script>