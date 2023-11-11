import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
//引入element plus
import ElementPlus from "element-plus";
import * as Icons from '@element-plus/icons-vue'
import "element-plus/dist/index.css";
//我们使用sass 所以这里将base.css 改成base.scss
import '@/assets/base.scss';
import Dialog from "@/components/DialogCon.vue"
import regs from '@/utils/Verify'
import Message from '@/utils/message'
import Request from "./utils/request";


import { mavonEditor } from "mavon-editor";
import 'mavon-editor/dist/css/index.css';

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
  });


//图标 图标在附件中
const app = createApp(App);
app.use(VueMarkdownEditor);
app.use(store);
app.use(router);
app.use(ElementPlus);
for (let i in Icons) {
  app.component(i, Icons[i])
}
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.globalInfo = {
    bodyWidth: 80,
}
app.config.globalProperties.Verify = regs;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Request = Request;
app.component("Dialog", Dialog);
app.mount("#app");
