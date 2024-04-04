<template>
  <div class="content">
    <div class="container">
  <!-- <card> -->
    <h4 class="header">Holidays</h4>
    <form @submit="validateAndSubmit">
      <div class="row">
        <div class="col-6">
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
      <div class="row">
        <div class="col-6">
          <fieldset class="form-group">
            <label>Customer</label>
            <input type="text" class="form-control" v-model="data.customer" 
            readonly placeholder="Light dashboard"/>
          </fieldset>
        </div>
        <div class="col-6">
          <fieldset class="form-group">
            <label>Group</label>
            <input type="text" class="form-control border-end" v-model="data.group" 
            readonly placeholder="group"/>
          </fieldset>
        </div>
      </div>
      
      <fieldset class="form-group my-3">
        <label for="customSwitch" class="col-5 col-form-label">공휴일 사용여부
          <input type="checkbox" class="col-1" id="customSwitch" v-model="data.isPublicHoliday">{{data.isPublicHoliday}}
        </label>
      </fieldset>
      
      <hr class="col-12 my-4">
      
      <div class="row">
        <label class="col-2 my-2">정기휴무 </label>
        <div class="col-9">
          <button @click="cycleSizeIncrease" class="btn float-end btn-success btn-sm">Add</button>
        </div>
      </div>

      <!-- <div class="row" >
        <label class="col-12">{{ data.cycleHolidays }}</label>
        <label class="col-12">{{ duplicatedCycleIndexes }}</label>
      </div> -->
      
      <div class="row my-2" v-for="(item, index) in data.cycleHolidays" :key="'cycle'+index">
        <div class="col-10">
          <label class="mx-4 text-secondary">{{ index }}</label>
          <select v-model="item.cycle" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
            <option v-for="(option) in options.cycle" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          &nbsp;
          <select v-model="item.dayOfWeek" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
            <option v-for="(option) in options.dayOfWeek" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          &nbsp;
          <span class="text-danger" v-if="isDupleCycle(index)">중복된 값 입니다.</span>
        </div>
        <div class="col-1">
          <button @click="cycleSizeDecrease(index)" class="btn float-end btn-danger btn-sm">delete</button>
        </div>
      </div>
      
      <hr class="col-12 my-4">
      
      <div class="row">
        <label class="col-2 my-2">임시휴무 </label>
        <div class="col-9">
          <button @click="TempholidaysIncrease" class="btn float-end btn-success btn-sm">Add</button>
        </div>
      </div>

      <!-- <div class="row">
          <label class="col-12">{{ data.tempholidays }}</label>
          <label class="col-12">{{ duplicatedTempIndexes }}</label>
      </div>       -->
      
      <div class="row my-2" v-for="(item, index) in data.tempholidays" :key="index">
        <div class="col-10">
          <label class="px-4 text-secondary">{{ index }}</label>
          <input type="date" v-model="data.tempholidays[index]" size="7" :min="computedToday" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
          &nbsp;
          <input :value="extractionDayOfWeek(item)" size="3" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
          &nbsp;
          <span class="text-danger" v-if="isDupleTemp(index)">중복된 값 입니다.</span>
        </div>
        <div class="col-1">
          <!-- <button v-if="item.id==='new'" @click="TempholidaysDecrease(index)" class="btn float-right btn-danger btn-xs">remove</button>
          <button v-else @click="TempholidaysDelete(index)" class="btn float-right btn-danger btn-xs">delete</button> -->
          <button @click="TempholidaysDecrease(index)" class="btn float-end btn-danger btn-sm">delete</button>
        </div>
      </div>

      <button type="submit" class="btn btn-info btn-fill my-3">Update</button>
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
        options:{
          cycle:[
            {label:'매월 첫째주', value:"w1"},
            {label:'매월 둘째주', value:"w2"},
            {label:'매월 셋째주', value:"w3"},
            {label:'매월 마지막주', value:"wl"},
            {label:'매주',value:"aw"}
          ],
          dayOfWeek:[
          {label:'월요일', value:"mon"},
          {label:'화요일', value:"tue"},
          {label:'수요일', value:"wed"},
          {label:'목요일', value:"thu"},
          {label:'금요일', value:"fri"},
          ],
        },
        data: {
          id: 1,
          customer: '현대카드',
          group: 'H1',
          isPublicHoliday: true,
          cycleHolidays:[
            {cycle:"w1", dayOfWeek: 'mon'},
            {cycle:'w2', dayOfWeek: 'tue'}
          ],
          holidays : ['매주 첫째주 월요일','매주 마지막주 수요일',' '],
          tempholidays : ['2024-02-11','2024-02-13'],
          businessHours: {
            customer: '현대카드',
            group: 'H1',
          }
        }
      }
    },
    computed:{
      computedToday(){
        return this.$dayjs().format("YYYY-MM-DD");
      },
      tempIsBeforeToday(){
        //하루라도 오늘 이전 데이터가 있으면 true 반환
        return this.data.tempholidays.some(item => {
          return this.$cal.applyDateDiff(this.computedToday, item) < 0 ;
        });
      },
      duplicatedCycleIndexes(){
        const set = new Set();
        const duplicateIndexes = [];
        this.data.cycleHolidays.forEach((item, index) => {
          const key = item.cycle + item.dayOfWeek;
          if (set.has(key)) {
            duplicateIndexes.push(index);
          } else {
            set.add(key);
          }
        });
        return duplicateIndexes;
      },
      duplicatedTempIndexes(){
        const set = new Set();
        const duplicateIndexes = [];
        this.data.tempholidays.forEach((item, index) => {
          if (set.has(item)) {
            duplicateIndexes.push(index);
          } else {
            set.add(item);
          }
        });
        return duplicateIndexes;
      }

    },
    methods: {
      isDupleCycle(index){
          return this.duplicatedCycleIndexes.includes(index);
      },
      isDupleTemp(index){
          return this.duplicatedTempIndexes.includes(index);
      },
      extractionDayOfWeek(date){
        return this.$cal.applyExtractDayOfWeek(date);
      },
      // TempholidaysDelete(index){ //별도 id관리 안하고 그룹별 index로 관리.
      TempholidaysIncrease(){
        this.data.tempholidays.push(this.computedToday);
      },
      TempholidaysDecrease(index){
        this.data.tempholidays.splice(index, 1);
      },
      cycleSizeIncrease(){
        this.data.cycleHolidays.push({cycle:'w1', dayOfWeek: 'mon'});
      },
      cycleSizeDecrease(index){
        this.data.cycleHolidays.splice(index, 1);
      },
      


      validateAndSubmit() {
      this.errors = [];

      if (this.tempIsBeforeToday) {
        this.errors.push("임시휴무는 오늘 이후 날짜여야 합니다.");
      }
      if (this.duplicatedCycleIndexes > 0) {
        this.errors.push("정기휴무는 중복되지 않아야 합니다.");
      }
      if(this.duplicatedTempIndexes > 0){
        this.errors.push("임시휴무는 중복되지 않아야 합니다.");
      }

      if (this.errors.length === 0) {
        if (this.id == -1) {
          // UserDataService.createUser({
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   emailId: this.emailId,
          // }).then(() => {
            alert('Your data: ' + JSON.stringify(this.data))
            this.$router.push("/grouplist");
          // });
        } else {
          // UserDataService.updateUser(this.id, {
          //   id: this.id,
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   emailId: this.emailId,
          // }).then(() => {
            alert('Your data: ' + JSON.stringify(this.data))
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
