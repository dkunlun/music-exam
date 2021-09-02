import Vue from 'vue';
import {
  Loading,
  Form,
  FormItem,
  Input,
  Button,
  Radio,
  RadioButton,
  RadioGroup,
  Slider,
  Tag
} from 'element-ui';

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Slider)
Vue.use(Tag)
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;