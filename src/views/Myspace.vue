<template>
    <div>
        <el-row class="tac">
            <el-col :span="4">
                <el-menu default-active="2" class="el-menu-vertical-demo">
                    <el-menu-item index="2" @click="getLikeMessage">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>我的点赞</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="sideNumber(2)">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>更新头像</span>
                    </el-menu-item>
                    <div style="height: 200px;"></div>
                </el-menu>
            </el-col>
            <div v-if="nowSpace == 2">
                <h2 style="text-align: center;">当前头像</h2>
                <div class="demo-basic--circle">
                    <div class="block" style="margin-left: 25px;">
                        <el-avatar :size="150" :src="circleUrl" />
                    </div>
                </div>
                <div style="height: 10px;"></div>
                <div>
                    <el-upload ref="uploadRef" class="upload-demo" :action="avatarBase" :headers="myHeader"
                        :on-success="uploadSucces" :before-upload="beforeUpload" :on-exceed="handleExceed"
                        accept=".jpg,.png,.JPG,.PNG" :auto-upload="false" list-type="picture" limit="1">
                        <template #trigger>
                            <el-button type="primary" style="margin-left: 10px;">选择头像</el-button>
                        </template>

                        <el-button class="ml-3" type="success" @click="submitUpload" style="margin-left: 10px;">
                            确认更换
                        </el-button>

                        <template #tip>
                            <div class="el-upload__tip">
                                支持.jpg 与 .png 文件,大小不超过1MB
                            </div>
                        </template>
                    </el-upload>
                </div>
            </div>

            <div v-if="nowSpace == 1">
                <div v-for="item in MyLikeList" :key="item">
                    <el-card style="width: 900px; min-height: 100px;">
                        <div>文章标题
                            <a :href="'#/postContent' + item.entityId" style="text-decoration: none;">{{ item.title }}</a>
                        </div>
                    </el-card>
                </div>
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10]"
                        layout="total, sizes, prev, pager, next, jumper" :total="total"
                        @current-change="commentHandleCurrent" />
                </div>
            </div>

        </el-row>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();

const nowSpace = ref(1);
const circleUrl = ref();
const baseUrl = '/api/';
const uploadRef = ref();
const avatarBase = "/api/user/avatar";
let token = sessionStorage.getItem("authorization");
const myHeader = {
    authorization: token,
}

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const beforeUpload = (file) => {
    let token1 = sessionStorage.getItem("authorization");
    myHeader.authorization = token1;
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        proxy.Message.error('上传头像图片大小不能超过 1MB!');
    }
    return isLt1M;
}



const getLikeMessage = () => {
    nowSpace.value = 1;
    getMyLikeList();
}


const sideNumber = (number) => {
    nowSpace.value = number;
    getAvatar();
};



const uploadSucces = () => {
    proxy.Message.success("头像更换成功!");
    getAvatar();
}


const submitUpload = () => {
    uploadRef.value.submit()
}

const handleExceed = () => {
    proxy.Message.error("不能上传多张照片作为头像")
}



const getAvatar = () => {
    let token = sessionStorage.getItem("authorization");
    if (token == null || token == "") {
        proxy.Message.error("未登录，若已登录请刷新尝试");
    }
    axios({
        url: "/api/user/avatar",
        headers: {
            authorization: token
        },
    }).then((res) => {
        circleUrl.value = baseUrl + res.data.data;
    })
}

const MyLikeList = ref();

const getMyLikeList = () => {
    let token = sessionStorage.getItem("authorization");
    axios({
        url: "/api/message/MyLike",
        headers: {
            authorization: token
        },
        data: {
            currentPage: 1,
            pageSize: 10
        },
        method: 'post'
    }).then((res) => {
        if (res.data.code == 200) {
            MyLikeList.value = res.data.data.myLikeList;
            total.value = res.data.data.total;
            console.log(MyLikeList.value);
        }
        else {
            proxy.Message.error(res.data.msg);
        }
    })
}

getMyLikeList();







</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
