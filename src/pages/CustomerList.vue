<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <div class="p-3">
              <slot class="header">
                <h4 class="card-title">고객사 관리</h4>
                <p class="card-category">등록된 고객사 목록을 표시하고 관리할 수 있는 페이지.</p>
                    <button class="btn float-end btn-success btn-sm" @click="addCustomer()">
                      Add
                    </button>
                  </slot>
            </div>
            <u-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="table1.data"
                     @edit="updateCustomer"
                     @del="deleteCustomer"
                     >
            </u-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const tableColumns = ['id', 'customer', 'group','vdn', 'updateat']
  const tableData = [{
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
  export default {
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        table2: {
          columns: [...tableColumns],
          data: [...tableData]
        },
      }
    },
    methods : {
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