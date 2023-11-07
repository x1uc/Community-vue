<template>
    <div class="login-dialog">
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
                        <el-button type="primary" :disabled="disabled" @click="sendCode">{{ codeBtnMsg }}</el-button>
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
                    <el-button class="login-button" type="primary" v-if="opType == 0" @click="login">登录</el-button>
                    <el-button class="login-button" type="primary" v-if="opType == 1" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </Dialog>

    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, getCurrentInstance, reactive, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const codeBtnMsg = ref("验证码发送")
const loginStatus = ref(false);
const disabled = ref(false)
const api = {
    checkCode: "https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b"
}
const regEmail = ref(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
const checkCodeUrl = ref(api.checkCode)
const changeCheckCode = (type) => {
    console.log("Login 63");
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


// 初始化登陆注册表单
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

const sendCode = () => {
    console.log(formData);
    if (!formData.value.email) {
        proxy.Message.error("邮箱不能为空");
        return;
    }
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(formData.value.email)) {
        proxy.Message.error("邮箱格式错误");
        return;
    }
    // 发送验证码
    axios({
        method: 'post',
        url: "/api/user/code",
        data: {
            email: formData.value.email
        },
    }).then((res) => {
        if (res.data.code == 200) {
            proxy.Message.success(res.data.msg);
        } else {
            proxy.Message.error(res.data.msg);

        }
    })
    // 禁用按钮
    disabled.value = true;
    // 按钮倒计时
    let i = 60;
    codeBtnMsg.value = (i--) + '秒后可重发'
    let taskId = setInterval(() => codeBtnMsg.value = (i--) + '秒后可重发', 1000);
    setTimeout(() => {
        disabled.value = false;
        clearInterval(taskId);
        codeBtnMsg.value = "发送验证码";
    }, 59000)
}


const login = () => {
    if (!formData.value.email) {
        proxy.Message.error("邮箱不能为空");
        return;
    }
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(formData.value.email)) {
        proxy.Message.error("邮箱格式错误");
        return;
    }
    if (!formData.value.password) {
        proxy.Message.error("密码不能为空");
        return;
    }
    axios({
        method: 'post',
        url: "/api/user/login",
        data: {
            email: formData.value.email,
            password: formData.value.password
        },
    }).then((res) => {
        if (res.data.code == 200) {
            sessionStorage.setItem("authorization", res.data.msg);
            proxy.Message.success("登录成功！")
            dialogConfig.show = false;
        }
        else {
            proxy.Message.error(res.data.msg);
        }
    }).catch((error) => {
        proxy.Message.error("错误");
    })
}


const register = () => {

    if (!formData.value.email) {
        proxy.Message.error("邮箱不能为空");
        return;
    }
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(formData.value.email)) {
        proxy.Message.error("邮箱格式错误");
        return;
    }
    if (!formData.value.password) {
        proxy.Message.error("密码不能为空");
        return;
    }
    if (!formData.value.NickName) {
        proxy.Message.error("昵称不能为空");
        return;
    }

    if (!formData.value.emailCode) {
        proxy.Message.error("邮箱验证码不能为空");
        return;
    }
    axios({
        method: 'post',
        url: "/api/user/register",
        data: {
            email: formData.value.email,
            password: formData.value.password,
            NickName: formData.value.NickName,
            emailCode: formData.value.emailCode
        },
    }).then((res) => {
        if (res.data.code == 200) {
            proxy.Message.success(res.data.msg);
        } else {
            proxy.Message.error(res.data.msg);
        }
    })
}





// 0 是 登录 1 是注册
const opType = ref();
const showPannel = (type) => {
    opType.value = type;
    reSetForm();
}
defineExpose({ showPannel, loginStatus })  //defineExpose 用于暴露一些方法或数据给父组件调用
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
