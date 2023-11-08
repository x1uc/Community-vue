<template>
    <div>

        <div v-for="postVo in records" :key="postVo">
            <el-card @click="toPost(postVo.post.id)" class="card">
                {{ postVo.userName }}
                {{ postVo.post.createTime }}
                <br>
                <h1>{{ postVo.post.title }}</h1>
                <div class="markdown-body" v-html="postVo.content"></div>
            </el-card>
        </div>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[4, 8]"
                :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="tatal" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { parseMinWidth } from 'element-plus/es/components/table/src/util';
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const records = ref({});

// 分页参数
const currentPage = ref(1)
const pageSize = ref(4)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const tatal = ref(400)
//分页函数
const handleCurrentChange = () => {
    // axios({
    //     url: '/post/page',
    //     data: {
    //         pageSize: pageSize.value,
    //         currentPage: currentPage.value,
    //     }
    // })
    console.log("123");
}

const handleSizeChange = () => {
    console.log("456");
}
//上方是分页函数 与 参数




const getPost = () => {
    axios({
        method: 'post',
        url: 'api/post/page',
    }).then((res) => {
        records.value = res.data.data;
    })
}
getPost();
const toPost = (e) => {
    router.push({
        name: "postContent",
        params: {
            id: e
        },
    })
}




</script>

<style lang="scss" scoped>
.el-card {
    cursor: pointer
}
</style>