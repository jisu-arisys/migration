<template>
  <div class="content">
    <div class="container">
  <!-- <card> -->
    <h4 class="header">Business Hours</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <div v-if="errors.length">
            <div
            class="alert alert-danger"
            v-bind:key="index"
            v-for="(error, index) in errors"
            >
            {{ error }}
          </div>
        </div>
        </div>
      </div>
      <div class="col-6">
        <fieldset class="form-group my-3">
          <label>Customer</label>
          <input type="text" class="form-control" v-model="businessHours.customer" 
          disabled placeholder="Light dashboard"/>
        </fieldset>
        <fieldset class="form-group my-3">
          <label>Group</label>
          <input type="text" class="form-control" v-model="businessHours.group" 
          placeholder="group"/>
        </fieldset>
      </div>

      <div class="row my-3">
        <div class="col-md-3">
          <label>월요일 ~ 금요일</label>
          <input type="time" class="form-control" v-model="businessHours.monday.openingTime" :readonly="businessHours.monday.isHoly">
        </div>
        <div class="col-md-3">
          <label> &nbsp;</label>
          <input type="time" class="form-control" v-model="businessHours.monday.closingTime" :readonly="businessHours.monday.isHoly">
        </div>
        &nbsp;
        <time-radio id="monday" @hours="setHolyHours"
        :openingTime="businessHours.monday.openingTime" :closingTime="businessHours.monday.closingTime"
        ></time-radio>
      </div>

      <div class="row my-3">
        <div class="col-md-3">
          <label>토요일</label>
          <input type="time" class="form-control" v-model="businessHours.saturday.openingTime" :readonly="businessHours.saturday.isHoly">
        </div>
        <div class="col-md-3">
          <label> &nbsp;</label>
          <input type="time" class="form-control" v-model="businessHours.saturday.closingTime" :readonly="businessHours.saturday.isHoly">
        </div>
        &nbsp;
        <time-radio id="saturday" @hours="setHolyHours"
        :openingTime="businessHours.saturday.openingTime" :closingTime="businessHours.saturday.closingTime"
        ></time-radio>
      </div>

      <div class="row my-3">
        <div class="col-md-3">
          <label>일요일</label>
          <input type="time" class="form-control" v-model="businessHours.sunday.openingTime" :readonly="businessHours.sunday.isHoly">
        </div>
        <div class="col-md-3">
          <label> &nbsp;</label>
          <input type="time" class="form-control" v-model="businessHours.sunday.closingTime" :readonly="businessHours.sunday.isHoly">
        </div>
        &nbsp;
        <time-radio id="sunday" @hours="setHolyHours"
        :openingTime="businessHours.sunday.openingTime" :closingTime="businessHours.sunday.closingTime"
        ></time-radio>
      </div>
      <div class="my-3">
        <button type="submit" class="btn btn-info btn-fill" @click.prevent="validateAndSubmit">
          Update
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  <!-- </card> -->
        
</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        errors: [],
        businessHours: {
          customer: '현대카드',
          group: 'H1',
          description: '',
          monday: {
            isHoly: false,
            openingTime: '09:00',
            closingTime: '18:00',
          },
          saturday: {
            isHoly: false,
            openingTime: '09:00',
            closingTime: '18:00',
          },
          sunday: {
            isHoly: false,
            openingTime: '09:00',
            closingTime: '18:00',
          },
        }
      }
    },
    methods: {
      setHolyHours(id, openingTime, closingTime, isHoly) {
      this.businessHours[id].openingTime = openingTime;
      this.businessHours[id].closingTime = closingTime;
      this.businessHours[id].isHoly = isHoly;
    },
      getTimeDiff(time1,time2){
        const openingTime = this.$dayjs(`2024-03-14T${time1}:00`);
        const closingTime = this.$dayjs(`2024-03-14T${time2}:00`);
        const timeDiff = closingTime.diff(openingTime,'minutes');
        console.log(time1 +'~' +time2 + ':'+ timeDiff);
        return timeDiff;
      },
      validateAndSubmit() {
      this.errors = [];

      if (!this.businessHours.monday.openingTime) {
        this.errors.push("Enter valid values");
      } else if (this.getTimeDiff(this.businessHours.monday.openingTime, this.businessHours.monday.closingTime)<0) {
        this.errors.push("openingTime 은 closingTime 보다 이른 시간이어야 합니다.");
      }
      if (!this.businessHours.saturday.openingTime) {
        this.errors.push("Enter valid values");
      } else if (this.getTimeDiff(this.businessHours.saturday.openingTime, this.businessHours.saturday.closingTime)<0) {
        this.errors.push("openingTime 은 closingTime 보다 이른 시간이어야 합니다.");
      }
      if (!this.businessHours.sunday.openingTime) {
        this.errors.push("Enter valid values");
      } else if (this.getTimeDiff(this.businessHours.sunday.openingTime, this.businessHours.sunday.closingTime)<0) {
        this.errors.push("openingTime 은 closingTime 보다 이른 시간이어야 합니다.");
      }

      if (this.errors.length === 0) {
        if (this.id == -1) {
          // UserDataService.createUser({
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   emailId: this.emailId,
          // }).then(() => {
            alert('Your data: ' + JSON.stringify(this.businessHours))
            this.$router.push("/grouplist");
          // });
        } else {
          // UserDataService.updateUser(this.id, {
          //   id: this.id,
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   emailId: this.emailId,
          // }).then(() => {
            alert('Your data: ' + JSON.stringify(this.businessHours))
            this.$router.push("/grouplist");
          // });
        }
      }
    },
    }
  }

</script>
<style>

</style>
