<template>
    <div>

        <div v-for="postVo in records" :key="postVo">
            <el-card @click="toPost(postVo.id)" class="card">
                {{ postVo.userName }}
                {{ postVo.createTime }}
                <br>
                <h1>{{ postVo.title }}</h1>
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
    axios({
        method: 'post',
        url: '/api/post/page',
        data: {
            pageSize: parseInt(pageSize.value),
            currentPage: parseInt(currentPage.value),
        }
    }).then((res) => {
        tatal.value = res.data.data.total;
        records.value = res.data.data.records;
    })
}

const handleSizeChange = () => {
    currentPage.value = 1;
    axios({
        method: 'post',
        url: '/api/post/page',
        data: {
            pageSize: pageSize.value,
            currentPage: currentPage.value,
        }
    }).then((res) => {
        tatal.value = res.data.data.total;
        records.value = res.data.data.records;
    })
}
//上方是分页函数 与 参数

const getPost = () => {
    axios({
        method: 'post',
        url: '/api/post/page',
        data: {
            pageSize: parseInt(pageSize.value),
            currentPage: parseInt(currentPage.value),
        }
    }).then((res) => {
        tatal.value = res.data.data.total;
        records.value = res.data.data.records;
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