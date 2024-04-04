<template>
  <div class="row">
    <slot name="header">
      <h4 class="card-title">고객사 그룹별 일정관리</h4>
      <p class="card-category">등록된 고객사 목록을 표시하고 영업일정을 수정 할 수 있는 페이지.</p>
    </slot>
    <div class="col-md-12">
      <card class="strpied-tabled-with-hover"
      body-classes="table-full-width table-responsive"
      >
      <u-table class="table-hover table-striped"
        :columns="table1.columns"
        :data="table1.data"
        @edit="updateCustomer"
        @del="deleteCustomer"
        >
      </u-table>
      <l-table class="table-hover table-striped"
        :columns="table1.columns"
        :data="table1.data"
        >
      </l-table>
        
      </card>
    </div>
  </div>
  <div class="col-3">
    {{ isHoly }}
  </div>
  <div class="row">
    <time-radio id="monday" :openingTime="open" :closingTime="close" @hours="setHolyHours"></time-radio>
    <base-input label="Customer" v-model="table1.data[0].customer"></base-input>
      {{ test }}
    <br>
    {{ table1.data }}  
  </div>
</template>
<script>
const tableColumns = ['id', 'customer', 'group','vdn', 'updateat']
  export default {
    data () {
      return {
        open : '09:00',
        close : '18:00',
        isHoly : true,
        test : 'test',
        table1: {
          columns: [...tableColumns],
          data: [{
            id: 1,
            customer: 'A사',
            vdn: '36',
            group: '5',
            updateat: '2024-02-11 13:07:03'
          },
          { id: 2,
            customer: 'B사',
            vdn: '36',
            group: '5',
            updateat: '2024-02-11 13:07:03'
          },
          {
            id: 3,
            customer: 'C사',
            vdn: '46',
            group: '6',
            updateat: '2024-02-11 13:07:03'
          },
          {
            id: 4,
            customer: 'O사',
            vdn: '37',
            group: '7',
            updateat: '2024-02-11 13:07:03'
          },
          {
            id: 5,
            customer: 'W사',
            vdn: '56',
            group: '8',
            updateat: '2024-02-11 13:07:03'
          }]
        }
      }
    },
    methods : {
      setHolyHours(id, openingTime, closingTime, isHoly) {
        this.open = openingTime;
        this.close = closingTime;
        this.isHoly = isHoly;
        console.log(id, isHoly);
    },
      addCustomer(){
        if(confirm("고객사를 추가하시겠습니까?")){
          this.$router.push("/customerupdate/-1");
        }
      },
      updateCustomer(row){
        this.$router.push("/customerupdate/"+row.id);
      },
      deleteCustomer(row){
        if(confirm(row.customer + "를 삭제하시겠습니까?")){
          console.log("deleteCustomer :" + row.id);
        }
      }
    }
}
</script>