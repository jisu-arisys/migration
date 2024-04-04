<template>
  <card>
    <div>
      <slot class="header">
        <h4 class="card-title">고객사 그룹별 일정관리</h4>
        <p class="card-category">등록된 고객사 목록을 표시하고 영업일정을 수정 할 수 있는 페이지.</p>
      </slot>
      <div class="d-flex p-2">
        <div class="col-10">
          <label>고객사
            <select v-model="filterOrder.customer" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
              <option v-for="(option, index) in extractCustomers" :key="'customer' +index" :value="option">{{ option || '전체' }}</option>
            </select>
          </label>
          &nbsp;&nbsp;
          <label>그룹
            <select v-model="filterOrder.group" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
              <option v-for="(option, index) in extractGroups" :key="'group' +index" :value="option">{{ option || '전체' }}</option>
            </select>
          </label>
          &nbsp;&nbsp;
          <label>검색
            <input type="text" size="15" v-model="filterOrder.keyword" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2"/>
          </label>
        </div>         
        <div class="col-2">
          <button class="btn float-end btn-success" @click="addGroup()">Add</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <card class="strpied-tabled-with-hover"
              body-classes="table-full-width table-responsive"
        >
          <l-table class="table-hover table-striped"
            :columns="table1.columns"
            :data="table1.data"
            @handle="togleGroup">
          </l-table>
          <page-button :max-page="maxPage" v-model="currentPage" ></page-button>
          </card>
        </div>
        
        <div class="col-md-5">          
          <card>
            <detail-item label="Details">
              <button v-if=expandedData class="btn float-end btn-danger btn-sm" @click="deleteGroup()">Delete</button>
            </detail-item>

            <div v-if=expandedData>
              <detail-item label="Customer">{{ expandedData.customer }}</detail-item>
              <detail-item label="Group">{{ expandedData.group }}</detail-item>
              
              <hr class="col-12">
              
              <detail-item label="영업시간">
                <button class="btn float-end btn-warning btn-sm" @click="updateTime()">Update</button>
              </detail-item>
              <detail-item label="월요일 ~ 금요일">
                <span v-if="expandedData.businessHours.monday.isHoly">휴일</span>
                <span v-else-if="expandedData.businessHours.monday.is24">24시간</span>
                <span v-else>{{ expandedData.businessHours.monday.openingTime +' ~ '+expandedData.businessHours.monday.closingTime }}</span>
              </detail-item>
              <detail-item label="토요일">
                <span v-if="expandedData.businessHours.saturday.isHoly">휴일</span>
                <span v-else-if="expandedData.businessHours.saturday.is24">24시간</span>
                <span v-else>{{ expandedData.businessHours.saturday.openingTime +' ~ '+expandedData.businessHours.saturday.closingTime }}</span>
              </detail-item>
              <detail-item label="일요일">
                <span v-if="expandedData.businessHours.monday.isHoly">휴일</span>
                <span v-else-if="expandedData.businessHours.monday.is24">24시간</span>
                <span v-else>{{ expandedData.businessHours.monday.openingTime +' ~ '+expandedData.businessHours.monday.closingTime }}</span>
              </detail-item>

              <hr class="col-12">
              
              <detail-item label="휴일">
                <button class="btn float-end btn-warning btn-sm" @click="updateHoly()">Update</button>
              </detail-item>
              <detail-item label="공휴일 여부">
                <span>{{ expandedData.isPublicHoliday }}</span>
              </detail-item>
              <detail-item label="정기휴일">
                <p class="my-2" v-for="(item,index) in expandedData.holidays" :key="'holy'+index">{{ item }}</p>
              </detail-item>
              <detail-item label="임시휴일">
                <p v-for="index in 3" :key="index">{{ expandedData.tempholidays[index] }}</p>
              </detail-item>
          </div>
        </card>
      </div>
    </div>
  </card>
</template>
<script>
import DetailItem from '../components/DetailItem.vue';
  const headerColumns = ['','', '', '' ,'┌  fulltime',' -----------------┐','┌  shorttime','------------------┐','','']
  const tableColumns = ['Id','customer', 'group', 'Vdn' ,'updateat']
  const tableData = [
    {
    id: 1,
    customer: '현대카드',
    group: 'H1',
    vdn: '36',
    holidays : ['매주 첫째주 월요일','마지막주 수요일','셋째주 화요일'],
    tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    isPublicHoliday: true,
    businessHours: {
      customer: '현대카드',
      group: 'H1',
      description: '',
      monday: {
        isHoly: false,
        is24: true,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      sunday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 2,
    customer: 'KB국민카드',
    group: 'K1',
    vdn: '45',
    holidays : ['매주 마지막주 금요일','',''],
    tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    isPublicHoliday: true,
    businessHours: {
      customer: 'KB국민카드',
      group: 'K1',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '12:00',
      },
      sunday: {
        isHoly: true,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  { id: 3,
    customer: '롯데카드',
    group: 'L1',
    vdn: '26',
    holidays : ['매주 첫째주 월요일','매주 마지막주 수요일',' '],
    tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    businessHours: {
      customer: 'KB국민카드',
      group: 'K1',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '12:00',
      },
      sunday: {
        isHoly: true,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 4,
    customer: '벤츠 파이낸셜',
    group: 'B1',
    vdn: '56',
    holidays : ['매주 마지막주 금요일','',''],
    tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    businessHours: {
      customer: 'KB국민카드',
      group: 'K1',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '12:00',
      },
      sunday: {
        isHoly: true,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 5,
    customer: 'A사',
    group: 'A5',
    vdn: '67',
    holidays : ['매주 마지막주 금요일','',''],
    tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    businessHours: {
      customer: 'KB국민카드',
      group: 'K1',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '12:00',
      },
      sunday: {
        isHoly: true,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 7,
    customer: 'B사',
    group: 'B5',
    vdn: '55',
    holidays : ['','',' '],
    tempholidays : ['','',' '],
    businessHours: {
      customer: 'B사',
      group: 'B5',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      sunday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  }

]
  export default {
    components:{
      DetailItem
    },
    data () {
      return {
        table1: {
          headers: [...headerColumns],
          columns: [...tableColumns],
          data: [...tableData]
        },
        filterOrder: {
          customer: "",
            group:"",
          keyword:""
        },
        pageSize:3,
        currentPage:1,
        expandedRow: null,
        expandedData: null,
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
        customer(){
          this.resetGroup();
        },
        deep: true,
      },
      'filterOrder.customer': {
        handler() {
          //고객사 옵션 변경시 그룹값 리셋
          this.filterOrder.group="";
        },
      },
    },
    computed:{
      maxPage(){
        return Math.ceil(this.searchedData.length / this.pageSize);
      },
      searchedData() {
        //종속성 : tableData, filterOrder.keyword
        let keywords = [this.filterOrder.customer, this.filterOrder.group, this.filterOrder.keyword];
        const filterProps = ['customer', 'group', 'vdn', 'updateat'];
        return this.$filter.applySearchFilters(tableData, keywords, filterProps);
    },
      paginatedData() {
        return this.$filter.applyPaginatedData(this.searchedData, this.currentPage, this.pageSize);
      },
      extractCustomers() {
        return this.$filter.applyExtractOptions(tableData,'customer');
      },
      extractGroups() {
        return this.$filter.applyExtractOptions(tableData,'group','customer',this.filterOrder.customer);
      },
    },
    methods : {
      updateTableData(){
        this.table1.data = this.paginatedData;
      },
      togleGroup(item){
        // 클릭한 행의 데이터를 저장하여 디테일 화면에 출력, 재클릭시 토글 기능 구현
        if (item) { 
          this.expandedData = this.expandedData === item ? null : item;
        }
      },
      updateHoly(){
          // console.log("updateHoly :" + this.expandedData.id);
          this.$router.push("/holytditform/"+this.expandedData.id);
      },
      updateTime(){
          // console.log("updateGroup :" + this.expandedData.id);
          this.$router.push("/timetditform/"+this.expandedData.id);
      },
      deleteGroup(){
        if(confirm(this.expandedData.id +" " + this.expandedData.customer + "의 " +this.expandedData.group+"를 삭제하시겠습니까?")){
          // console.log("deleteGruop :" + this.expandedData.id);
        }
      },
      addGroup(){
        if(confirm("그룹을 추가하시겠습니까?")){
          this.$router.push("/groupupdate/-1");
        }
      },
    },
    mounted(){
      this.updateTableData();
    }
}
</script>