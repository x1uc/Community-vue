<template>
    <div>
        <div class="header">
            <div class="header-content" style="width: 80%;">
                <div class="logo" @click="jumpMain">
                    <div class="logo-content">
                        <img src="../assets/logo.png" style="height: 100%;" />
                    </div>
                </div>
                <!-- 分类 -->
                <div class="menu"></div>
                <!-- 功能 -->
                <div class="user-info">
                    <div class="select" style="margin-top: 30px; margin-right: 25px; box-sizing: border-box;"
                        @click="jumpToPost">
                        我要发帖
                    </div>
                    <div class="select" style="margin-top: 30px;margin-right: 25px; display: flex;" @click="Notice">
                        通知中心
                        <div class="red_point" v-if="infoRedPoint != 0">{{ infoRedPoint }}</div>
                    </div>
                    <div style="display: flex;" v-if="loginStatus == 0">
                        <div class="select" style="margin-top: 30px;margin-right: 25px;" @click="login(1)">
                            注册
                        </div>
                        <div class="select" style="margin-top: 30px;margin-right: 25px;" @click="login(0)">
                            登录
                        </div>
                    </div>
                    <div style="display: flex;" v-if="loginStatus == 1">
                        <div class="select" style="margin-top: 30px;margin-right: 25px;" @click="junpMyspace">
                            我的
                        </div>
                        <div style="margin-right: 25px; margin-top:15px;" class="select">
                            <div class="demo-basic--circle">
                                <div class="block" @click="junpMyspace">
                                    <el-avatar :size="50" :src="circleUrl" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <el-button type="primary" @click="jumpToPost">发帖</el-button>
                    <el-button type="primary" @click="junpMyspace">搜索</el-button>
                    <el-button type="primary" @click="login(0)">登录</el-button>
                    <el-button type="primary" @click="login(1)">注册</el-button>
                    <el-button type="primary" @click="Notice">通知中心
                    </el-button> -->
                </div>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <!-- login and register -->
        <div>
            <Login ref="loginref" @getAvatar="getAvatar"></Login>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, getCurrentInstance, watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Login from './Login.vue';
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const ShowDialog = ref(false);
const loginref = ref()
const infoRedPoint = ref(0);
const loginStatus = ref(0);
const activeIndex = ref(1);

const log = () => {
    console.log(loginref.value)
}

const circleUrl = ref();
const baseUrl = '/api/';
const getAvatar = () => {
    let token = localStorage.getItem("token");
    if (token == null || token == "") {
        loginStatus.value = 0;
        return ;
    }
    else {
        loginStatus.value = 1;
    }
    axios({
        url: "/api/user/avatar",
        headers: {
            token : token
        },
    }).then((res) => {
        circleUrl.value = baseUrl + res.data.data;
    })
}



const login = (type) => {
    loginref.value.showPannel(type);
}

const created = () => {
    router.push("/mainPost");
}
created();


const buttons = [{
    type: "primary",
    text: "确认"
}];

const closeDialog = () => {
    ShowDialog.value = false;
}

const jumpToPost = () => {
    router.push({ path: '/userPost' })
}

const Notice = () => {
    router.push("/notice");
}

const jumpMain = () => {
    router.push({ path: "/mainPost" });
}

const getUnread = () => {
    let token = localStorage.getItem("token");
    if (token == null || token == "") {
        return;
    }
    else {
        axios({
            url: "/api/message/allUnRead",
            headers: {
                token: token
            }
        }).then((res) => {
            if (res.data.code == 200) {
                infoRedPoint.value = res.data.data;
                return;
            }
        })
    }
}
getUnread();
getAvatar();
const junpMyspace = () => {
    router.push({ path: "/Myspace" });
}


</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
}

.header-content {
    display: flex;
    width: 90%;
    height: 100%;
    background-color: rgb(195, 200, 202);
    margin: 0 auto;
    justify-content: space-between;
}

.logo {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
}

.menu {
    flex: 1
}

.user-info {
    width: 35%;
    display: flex;
    justify-content: flex-end;
}

.main {
    margin: 5px auto;
    width: 80%;
    height: 80%;
    box-sizing: border-box;
}

.red_point {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: red;
    text-align: center;
}

.select {
    cursor: pointer;
}
</style>
