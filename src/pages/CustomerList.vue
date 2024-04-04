<template>
  <div class="row">
    <div class="col-12">
      <card class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
      >
        <div class="px-3">
          <slot class="header">
            <h4 class="card-title">고객사 관리</h4>
            <p class="card-category">등록된 고객사 목록을 표시하고 관리할 수 있는 페이지.</p>
          </slot>
          <label class="p-3">
            검색
            <input type="text" size="15" v-model="filterOrder.keyword" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2"/>
          </label>
          <button class="btn float-end btn-success btn-sm" @click="addCustomer()">
            Add
          </button>
        </div>
        <u-table class="table-hover table-striped"
                  :columns="table1.columns"
                  :data="table1.data"
                  @edit="updateCustomer"
                  @del="deleteCustomer"
                  >
        </u-table>
        <page-button :max-page="maxPage" v-model="currentPage" ></page-button>
      </card>
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
        filterOrder: {
          keyword:""
        },
        pageSize:3,
        currentPage:1,
      }
    },
    watch: {
      currentPage: {
        handler() {
          this.updateTableData();
        },
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
        return Math.ceil(this.searchedData.length / this.pageSize);
      },
      searchedData() {
        //종속성 : tableData, filterOrder.keyword
        let keywords = [this.filterOrder.customer, this.filterOrder.group, this.filterOrder.keyword];
        const filterProps = ['id','customer', 'group', 'vdn', 'updateat'];
        return this.$filter.applySearchFilters(tableData, keywords, filterProps);
    },
      paginatedData() {
        return this.$filter.applyPaginatedData(this.searchedData, this.currentPage, this.pageSize);
      },
    },
    methods : {
      updateTableData(){
        this.table1.data = this.paginatedData;
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
    },
    mounted(){
      this.updateTableData();
    }
}
</script>