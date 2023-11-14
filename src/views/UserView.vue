<template>
    <div>
        <div class="header">
            <div class="header-content" :style="{ width: proxy.globalInfo.bodyWidth + '%' }">
                <div class="logo" @click="jumpMain">
                    <div class="logo-content">SYUCTACM</div>
                </div>
                <!-- 分类 -->
                <div class="menu"></div>
                <!-- 功能 -->
                <div class="user-info">
                    <el-button type="primary" @click="jumpToPost">发帖</el-button>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary" @click="login(0)">登录</el-button>
                    <el-button type="primary" @click="login(1)">注册</el-button>
                    <el-button type="primary" @click="Notice">通知中心</el-button>
                </div>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <!-- login and register -->
        <div>
            <Login ref="loginref"></Login>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Login from './Login.vue';
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const ShowDialog = ref(false);


const loginref = ref()
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
    router.push({path:"/mainPost"});
}


</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 12%;
    box-sizing: border-box;
}

.header-content {
    display: flex;
    width: 90%;
    height: 100%;
    background-color: red;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
}

.menu {
    flex: 1
}

.user-info {
    width: 25%;
    display: flex;
}

.main {
    margin: 5px auto;
    width: 80%;
    height: 80%;
    box-sizing: border-box;
}
</style>
