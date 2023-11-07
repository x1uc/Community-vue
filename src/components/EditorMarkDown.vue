<!-- author: Mr.J -->
<!-- date: 2023-03-29 15:01:56 -->
<!-- description: Vue3+JS代码块模板 -->
<template>
    <!-- 这里需要注意一下，官网上给的引入方式需要改一下，应该是没有更新导致的；还有一点就是modelValue需要添加括号，否则找不到这个值 -->
   <VueMarkdownEditor v-model="(modelValue)" :height="height+'px'"></VueMarkdownEditor>
</template>

<script setup>
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

import Prism from "prismjs";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  height: {
    type: Number,
    default: 500,
  },
});
</script>

<style>
</style>
