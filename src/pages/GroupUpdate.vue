<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-md-10">
        <h3>Group</h3>
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
                  <label>Customer Name</label>
                  <input v-if="!isNew" type="text" class="form-control" v-model="customer" readonly/>
                  <select v-if="isNew" v-model="customer" class="form-control bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
                    <option v-for="(option, index) in options" :key="index" :value="option.id">{{ option.customer }}</option>
                  </select>
                </fieldset>
                <fieldset class="form-group my-3">
                  <label>Group Name</label>
                  <input type="text" class="form-control" v-model="groups"/>
                </fieldset>
                <fieldset class="form-group my-3">
                  <label>Vdn List</label>
                  <input type="text" class="form-control" v-model="vdns"/>
                </fieldset>
                <button class="btn btn-success" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p v-if="isNew"></p>
    </div>
  </div>
</template>
<script>
// import UserDataService from "../service/UserDataService";

export default {
  name: "User",
  data() {
    return {
      isNew: false, // 초기값은 readonly로 설정
      customer: "",
      vdns: "",
      groups: "",
      setVdns: [],
      errors: [],
      tableData: [
      { id: 1, customer: '현대카드', vdns: '3678,4567', groups: 'A1,A2,A5', updateat: '2024-02-11 13:07:03' },
      { id: 2, customer: 'B사', vdns: '3678,4567', groups: 'B1,B5', updateat: '2024-02-11 13:07:03' },
      { id: 3, customer: 'C사', vdns: '3678,4567', groups: 'C1,C6', updateat: '2024-02-11 13:07:03' },
      { id: 4, customer: 'O사', vdns: '3678,4567', groups: 'O7,O9', updateat: '2024-02-11 13:07:03' },
      { id: 5, customer: 'W사', vdns: ['3678','4567'], groups: 'W5,W8', updateat: '2024-02-11 13:07:03' },
      ],
      options:[{id:1,customer:'A사'},{id:2,customer:'B사'},{id:3,customer:'C사'},{id:4,customer:'O사'},{id:5,customer:'W사'},],
    };
  },
  computed: {
    id() {
      // console.log(this.$route.params.id);
      return this.$route.params.id;
    },
  },
  methods: {
    toggleIsNew(){
      if(this.id == -1){
        this.isNew = !this.isNew;       // readonly 상태를 토글하는 함수
      }
      console.log("isNew:" + this.isNew);
    },
    refreshUserDetails() {
      //   UserDataService.retrieveUser(this.id).then((res) => {
      //     this.customer = res.data.customer;
      //     this.vdn = res.data.vdn;
      //     this.group = res.data.group;
      //   });
      const userData  = this.tableData.find(user => user.id == this.id); 
      if(userData){
        this.customer = userData.customer;
        this.vdns = userData.vdns;
        this.groups = userData.groups;
      }else{
        this.toggleIsNew();
      }

    },
    splitVDN() {
      // 쉼표로 구분된 값을 분할하여 다중 값으로 저장
      // console.log(this.vdns);
      this.setVdns = this.vdns.split(',').map(value => value.trim());
      // this.groups = this.vdnInput.split(',').map(value => value.trim());
      // console.log(this.setVdns.length, this.setVdns);
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.customer) {
        this.errors.push("Enter valid values in Customer Name");
      } else if (this.customer.length < 2) {
        this.errors.push("Enter atleast 2 characters in Customer Name");
      }

      if (!this.groups) {
        this.errors.push("Enter valid values in groups");
      } else if (this.groups.length < 2) {
        this.errors.push("Enter atleast 2 characters in groups");
      }
      if (!this.vdns) {
        this.errors.push("Enter valid values in vdns");
      } else if (this.vdns.length < 2) {
        this.errors.push("Enter atleast 2 characters in vdns");
      }

      if (this.isNew) {
        this.splitVDN();
        if (this.setVdns.length === 0) {
          this.errors.push("Enter vdn valid values");
        }
      }
     
      if (this.errors.length === 0) {
        if (this.isNew) {
          // UserDataService.createUser({
          //   customer: this.customer,
          //   vdn: this.vdn,
          //   group: this.group,
          // }).then(() => {            
            console.log("save new group" , this.customer,this.groups,this.setVdns);
            this.$router.push("/grouplist");
            // });
          } else {
            // UserDataService.updateUser(this.id, {
              //   id: this.id,
              //   customer: this.customer,
              //   vdn: this.vdn,
              //   group: this.group,
              // }).then(() => {
            console.log("update group",this.id ,this.customer,this.groups,this.setVdns);
            this.$router.push("/grouplist");
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