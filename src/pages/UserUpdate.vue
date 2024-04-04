<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div>
          <h3>User</h3>
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
              <div class="col-4">
                <fieldset class="form-group my-3">
                  <label>First Name</label>
                  <input type="text" class="form-control" v-model="firstName" />
                </fieldset>
                <fieldset class="form-group my-3">
                  <label>Last Name</label>
                  <input type="text" class="form-control" v-model="lastName" />
                </fieldset>
                <fieldset class="form-group my-3">
                  <label>Email Id</label>
                  <input type="text" class="form-control" v-model="emailId" />
                </fieldset>
                <button class="btn btn-success" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import UserDataService from "../service/UserDataService";

export default {
  name: "User",
  data() {
    return {
      firstName: "",
      lastName: "",
      emailId: "",
      errors: [],
      tableData: [
        { id: 1, 사용자id: 'admin', 사용자명: '관리자' },
        { id: 2, 사용자id: 'test1', 사용자명: '테스터' },
        { id: 3, 사용자id: 'test2', 사용자명: '테스터2' },
        { id: 4, 사용자id: 'test3', 사용자명: '테스터3' },
        { id: 5, 사용자id: 'user', 사용자명: '사용자' }
      ],
    };
  },
  computed: {
    id() {
      console.log(this.$route.params.id);
      return this.$route.params.id;
    },
  },
  methods: {
    refreshUserDetails() {
      //   UserDataService.retrieveUser(this.id).then((res) => {
      //     this.firstName = res.data.firstName;
      //     this.lastName = res.data.lastName;
      //     this.emailId = res.data.emailId;
      //   });
      const userData  = this.tableData.find(user => user.id == this.id); 
      if(userData){
        this.firstName = userData.사용자id;
        this.lastName = userData.사용자명;
        this.emailId = userData.id;
      }else{
        console.log(this.id + "not found");
      }

    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.firstName) {
        this.errors.push("Enter valid values");
      } else if (this.firstName.length < 2) {
        this.errors.push("Enter atleast 2 characters in First Name");
      }
      if (!this.lastName) {
        this.errors.push("Enter valid values");
      } else if (this.lastName.length < 2) {
        this.errors.push("Enter atleast 2 characters in Last Name");
      }
      if (this.errors.length === 0) {
        if (this.id == -1) {
          // UserDataService.createUser({
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   emailId: this.emailId,
          // }).then(() => {
            this.$router.push("/userlist");
          // });
        } else {
          // UserDataService.updateUser(this.id, {
          //   id: this.id,
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   emailId: this.emailId,
          // }).then(() => {
            this.$router.push("/userlist");
          // });
        }
      }
    },
  },
  created() {
    this.refreshUserDetails();
  },
};
</script>