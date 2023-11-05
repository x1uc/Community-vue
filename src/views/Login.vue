<template>
    <div class="login-dialog">
        <span>{{ formData.email }}</span>
        <Dialog :show="dialogConfig.show" :title="dialogConfig.title" :buttons="dialogConfig.buttons" width="400px"
            :showCancel="false" @close="dialogConfig.show = false">
            <el-form :model="formData" :rules="rules" ref="formDataRef" label-width="80px" @submit.prevent>
                <!--input输入-->

                <el-form-item prop="email">
                    <el-input maxlength="30" size="large" clearable placeholder="请输入邮箱" v-model="formData.email"></el-input>
                </el-form-item>
                <div v-if="opType == 1">
                    <el-form-item prop="emailCode" class="emailCode">
                        <el-input size="large" clearable placeholder="请输入验证码" v-model="formData.emailCode"
                            style="width: 50%;"></el-input>
                        <el-button type="primary">获取验证码</el-button>
                    </el-form-item>
                </div>

                <el-form-item prop="NickName" v-if="opType == 1">
                    <el-input size="large" maxlength="20" clearable placeholder="请输入昵称"
                        v-model="formData.NickName"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input size="large" type="password" clearable placeholder="请输入密码"
                        v-model="formData.password"></el-input>
                </el-form-item>


                <el-form-item prop="Repassword" v-if="opType == 1">
                    <el-input size="large" clearable placeholder="请再次输入密码" v-model="formData.Repassword"></el-input>
                </el-form-item>

                <el-form-item prop="checkCode">
                    <div class="check-code-panel">
                        <div>
                            <el-input size="large" clearable placeholder="请输入验证码" v-model="formData.checkCode"></el-input>
                        </div>
                        <div>
                            <img :scr="checkCodeUrl" class="check-code" @click="changeCheckCode(0)" :width="50"
                                :height="50" />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-button" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </Dialog>

    </div>
</template>

<script setup>
import { ref, getCurrentInstance, reactive, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();

const api = {
    checkCode: "https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b"
}

const checkCodeUrl = ref(api.checkCode)
const changeCheckCode = (type) => {
    console.log("Login 63");
}


const checkRepassword = (rule, value, callback) => {
    if (value !== formData.value.password) {
        callback(new Error(rule.message));
    }
    else {
        callback();
    }
}

const formData = ref({

});
const formDataRef = ref();
const rules = {
    email: [
        { required: true, message: "请输入邮箱" },
        { validator: proxy.Verify.email, message: "邮箱格式不正确" },
    ],
    password: [
        { required: true, message: "请输入密码" },
        { validator: proxy.Verify.password, message: "以字母开头 长度在6~18之间" },
    ],
    Repassword: [
        { required: true, message: "请输入密码" },
        { validator: checkRepassword, message: "两次输入的密码不一致" },
    ],
    emailCode: [
        { required: true, message: "请输入邮箱验证码" },
    ],
    NickName: [
        { required: true, message: "请输入昵称" },
    ],
}

const dialogConfig = reactive({
    show: false,
    title: "标题",
})

const reSetForm = () => {
    dialogConfig.show = true;
    console.log(opType.value);
    if (opType.value == 1) {
        dialogConfig.title = "注册"
    } else {
        dialogConfig.title = "登录"
    }
    nextTick(() => {
        changeCheckCode(0);
        formDataRef.value.resetFields();
    })
}

// 0 是 登录 1 是注册
const opType = ref();
const showPannel = (type) => {
    opType.value = type;
    reSetForm();
}
defineExpose({ showPannel })  //defineExpose 用于暴露一些方法或数据给父组件调用
</script>
<style lang="scss" scoped>
.check-code-panel {
    display: flex;
    justify-content: space-around;
}

.login-button {
    width: 100%;
}

.emailCode {
    display: flex;
}
</style>
