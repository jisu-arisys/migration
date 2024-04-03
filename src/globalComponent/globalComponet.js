import BaseInput from './BaseInput.vue';
import Card from './Card.vue';
import TableBasic from './TableBasic.vue';
import UTable from './TableUpdateDelete.vue';
import TimeRadio from './TimeRadio.vue';


export default {
  install(app) {
    app.component('BaseInput', BaseInput);//
    app.component('Card', Card);//
    app.component('LTable', TableBasic);//
    app.component('UTable', UTable);//
    app.component('TimeRadio', TimeRadio);//
  },
};