<template>
    <div v-if="data != null">
        <div v-html="data"></div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import axios from 'axios'
const { proxy } = getCurrentInstance();
const route = useRoute();
const id = route.params.id;
const data = ref();



const create = () => {
    axios({
        url: "/api/post?id=" + id,
        method: 'get',
    }).then((result) => {
        const str = (result.data.data.content).toString();
        console.log(str)
        const md = new MarkdownIt();
        data.value = md.render(str.toString());
        console.log(data);
    }).catch((err) => {
        console.log(err);
        proxy.Message.error("错误！！");
    });
}
create();
</script>

<style lang="scss" scoped></style>
