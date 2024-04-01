<template>
  <div>
    <h3>Vdn</h3>
    <div class="container">
      <form @submit="validateAndSubmit">
        <div v-if="errors.length">
          <div
            class="alert alert-danger"
            v-bind:key="index"
            v-for="(error, index) in errors"
          >
            {{ error }}
          </div>
        </div>
        <fieldset class="form-group">
          <label>Vdn Number</label>
          <input type="text" class="form-control" v-model="vdnNum" />
        </fieldset>
        <fieldset class="form-group">
          <label>Vdn Name</label>
          <input type="text" class="form-control" v-model="vdnName" />
        </fieldset>
        <fieldset class="form-group">
          <label>Update At</label>
          <input type="text" class="form-control" v-model="updateAt" />
        </fieldset>
        <button class="btn btn-success" type="submit">Save</button>
      </form>
    </div>
  </div>
</template>
<script>
import VdnDataService from "../service/VdnDataService";

export default {
  name: "Vdn",
  data() {
    return {
      vdnNum: "",
      vdnName: "",
      updateAt: "",
      errors: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    refreshVdnDetails() {
      if(this.id != -1){
        VdnDataService.retrieveVdn(this.id).then((res) => {
          this.vdnNum = res.data.vdnNum;
          this.vdnName = res.data.vdnName;
          this.updateAt = res.data.updateAt;
        });
      }
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.vdnNum) {
        this.errors.push("Enter valid values");
      } else if (this.vdnNum.length < 2) {
        this.errors.push("Enter atleast 2 characters in First Name");
      }
      if (!this.vdnName) {
        this.errors.push("Enter valid values");
      } else if (this.vdnName.length < 2) {
        this.errors.push("Enter atleast 2 characters in Last Name");
      }
      if (this.errors.length === 0) {
        if (this.id == -1) {
          VdnDataService.createVdn({
            vdnNum: this.vdnNum,
            vdnName: this.vdnName,
            updateAt: this.updateAt,
          }).then(() => {
            this.$router.push("/v");
          });
        } else {
          VdnDataService.updateVdn(this.id, {
            id: this.id,
            vdnNum: this.vdnNum,
            vdnName: this.vdnName,
            updateAt: this.updateAt,
          }).then(() => {
            this.$router.push("/");
          });
        }
      }
    },
  },
  created() {
    this.refreshVdnDetails();
  },
};
</script>