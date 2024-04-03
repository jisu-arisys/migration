<template>
  <div class="col-md-5">
    <label> &nbsp;{{ openingTime +' ~ '+ closingTime }}</label>
    <div class="p-2">
      <input type="radio" :id="id+'-open'" :name="id" value="18:00" 
      :v-value="closingTime" 
      @input="$emit('update:closingTime', $event.target.value)"
      @click="setHolyHours('09:00','18:00',false)"/>
      <label class="px-3" :for="id+'-open'">영업</label>
      
      <input type="radio" :id="id + '-closed'" :name="id" value="00:00" 
      :v-value="closingTime" 
      @input="$emit('update:closingTime', $event.target.value)"
      @click="setHolyHours('00:00','00:00',true)" />
      <label class="px-3" :for="id + '-closed'">휴일</label>
      
      <input type="radio" :id="id + '-24'" :name="id" value="24:00" 
      :v-value="closingTime" 
      @input="$emit('update:closingTime', $event.target.value)"
      @click="setHolyHours('00:00','24:00',true)" />
      <label class="px-3" :for="id + '-24'">24시간</label>
    </div>
  </div>
</template>
<script>
export default {
  name: "time-radio",
  props: {
    openingTime: {
      type: String,
      required: true
    },
    closingTime: {
      type: String,
      required: true
    },
    id : {
      type : String,
      required: true
    }
  },
  emits: ['update:closingTime'],

  data() {
    return {
      idSet: []
    };
  },
  methods : {
    setHolyHours (open,close, holy) {
      this.$emit('hours',this.id, open,close, holy)
    },
  }

}
</script>