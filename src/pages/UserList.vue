<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
          body-classes="table-full-width table-responsive"
          >
          <div class="p-3">
            <div class="header">
              <h4 class="card-title">사용자 관리</h4>
              <p class="card-category">수정된 사용자 목록을 표시하고 관리할 수 있는 페이지.12명 이상이면 스크롤 발생</p>
            </div>
            <label class="p-3">
              검색
              <input type="text" size="15" v-model="filterOrder.keyword" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2"/>
            </label>
            <button class="btn float-end btn-success btn-sm" @click="addUser()">
              Add
            </button>
          </div>
            <u-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="table1.data"
                     @edit="updateUser"
                     @del="deleteUser">
            </u-table>
            <page-button :max-page="maxPage" v-model="currentPage" ></page-button>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const tableColumns = ['id', '사용자id', '사용자명']
  const tableData = [{
    id: 1,
    사용자id: 'admin',
    사용자명: '관리자',
  },
  {
    id: 2,
    사용자id: 'test1',
    사용자명: '테스터',
  },
  {
    id: 3,
    사용자id: 'test2',
    사용자명: '테스터2',
  },
  {
    id: 4,
    사용자id: 'test3',
    사용자명: '테스터3',
  },
  {
    id: 5,
    사용자id: 'user',
    사용자명: '사용자',
  }
]
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
        return Math.ceil(this.searchedData.length / this.pageSize);
      },
      searchedData() {
        //종속성 : tableData, filterOrder.keyword
        let keywords = [this.filterOrder.keyword];
        const filterProps = ['id', '사용자id', '사용자명'];
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
      addUser(){
        this.$router.push("/userupdate/-1");
      },
      updateUser(row){
        this.$router.push("/userupdate/"+row.id);
      },
      deleteUser(row){
        if(confirm(row.사용자id +" " + row.사용자명 + "를 삭제하시겠습니까?")){
          console.log("deleteGruop :" + row.id);
        }
      }
    }
  }
</script>
<style>
</style>
