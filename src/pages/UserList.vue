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
        }
      }
    },
    methods : {
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
