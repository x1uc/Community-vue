<template>
    <div class="notice">
        <el-row class="tac">
            <el-col :span="4">
                <el-menu default-active="2" class="el-menu-vertical-demo">
                    <el-menu-item index="2" @click="getMessage(like)">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>点赞通知</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>评论通知</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>系统通知</span>
                    </el-menu-item>
                    <div style="height: 200px;"></div>
                </el-menu>
            </el-col>
            <div>
                <div v-for="item in content" :key="item">
                    <el-card style="width: 900px; min-height: 120px;">
                        <div>
                            {{ item.formUser }}
                            <span>{{ space }}</span>
                            {{ kfc(item.dateTime) }}
                        </div>
                        <div style="margin-top: 10px;">
                            给你的文章
                            <a href="javascrip:void(0)"> {{ item.content }}</a>
                            希望你能再接再厉，发布优质帖子
                        </div>
                    </el-card>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();

const content = ref();
const space = ref("                   ")
const like = "like"

const kfc = (time) => { // 请将 "时间戳" 替换为实际的时间戳
    let tm = parseInt(time);
    let date = new Date(tm);

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDateTime;
}

const getMessage = (str) => {
    let token = sessionStorage.getItem("authorization");
    axios({
        url: "/api/message/" + str,
        headers: {
            authorization: token
        }
    }).then(res => {
        console.log(res);
        content.value = res.data.data;
    })
}
getMessage(like);


</script>

<style lang="scss" scoped>
.notice {
    height: 100%;
    width: 100%;
}
</style>
