import BaseCheckbox from './BaseCheckbox.vue';
import BaseInput from './BaseInput.vue';
import BaseRadio from './BaseRadio.vue';
import Card from './Card.vue';
import TableBasic from './TableBasic.vue';
import UTable from './TableUpdateDelete.vue';
import TimeRadio from './TimeRadio.vue';


export default {
  install(app) {
    app.component('BaseCheckbox', BaseCheckbox);
    app.component('BaseRadio', BaseRadio);
    app.component('BaseInput', BaseInput);
    app.component('Card', Card);
    app.component('TableBasic', TableBasic);
    app.component('UTable', UTable);
    app.component('TimeRadio', TimeRadio);
  },
};