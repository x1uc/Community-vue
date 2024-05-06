<template>
    <div>
        <div class="m-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <!--富文本编辑器-->
                    <v-md-editor v-model="ruleForm.content" height="400px"></v-md-editor>
                    <!--<el-input type="textarea" :rows="20"   v-model="ruleForm.content"></el-input>-->
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">立即发布</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const ruleForm = ref({
    title: '',
    content: '',
});
const md = ref();
const ruleFormRef = ref();
const rules = {
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { min: 2, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' }
    ]
};

const test = () => {
    ruleFormRef.value.resetFields();
}

const success = () => {
    proxy.Message.success("发表成功");
}

const submitForm = () => {
    ruleFormRef.value.validate((valid) => {
        if (!valid) {
            return false;
        }
        else {
            let token = localStorage.getItem("token");
            console.log(token);
            axios({
                headers: {
                    token : token
                },
                method: 'post',
                url: "api/post/publish",
                data: {
                    title: ruleForm.value.title,
                    content: ruleForm.value.content
                }
            }).then((res) => {
                if (res.data.code == 200) {
                    proxy.Message.success(res.data.msg);
                    router.push("/mainPost");
                }
                else {
                    proxy.Message.error(res.data.msg);
                }
            })
        }
    })
}







</script>

<style scoped>
.m-content {
    text-align: center;
    margin-top: 20px;
}
</style>