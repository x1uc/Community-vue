<template>
    <div v-if="data != null">
        <h1> {{ userName }}</h1>
        <!-- 正文部分 -->
        <div v-html="data"></div>

        <div class="bottom">
            <div>
                ------comment area ------
            </div>
            <div class="comment-info">
                <el-input v-model="commentInput" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                    placeholder="Please input" />
                <el-button type="primary" class="comment-button" @click="addPostComment">
                    发布
                </el-button>
            </div>
        </div>
        <div>-----------</div>
        <!-- 评论部分 -->
        <div class="comment-first">
            <div class="comments-info">
                <el-card v-for="item in comment" :key="item">
                    <div class="comment-user-time">
                        {{ item.user.username + "发表于" }}
                        {{ item.comment.createTime }}
                        <div>
                            <el-button type="common" size="small">回复</el-button>
                        </div>
                    </div>
                    {{ item.comment.content }}
                </el-card>
            </div>
        </div>


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
const commentInput = ref("");
const userName = ref("");
const comment = ref({});
//type = 1 代表主体是 文章 
//type = 2 代表主题是 评论 


const create = () => {
    axios({
        url: "/api/post?id=" + id,
        method: 'get',
    }).then((result) => {
        console.log(result);
        const str = (result.data.data.postDto.post.content).toString();
        userName.value = result.data.data.postDto.userName.toString();
        comment.value = result.data.data.comment;
        const md = new MarkdownIt();
        data.value = md.render(str.toString());
        console.log(data);
    }).catch((err) => {
        console.log(err);
        proxy.Message.error("错误！！");
    });
}
create();



const addPostComment = () => {
    let token = sessionStorage.getItem("authorization");
    axios({
        url: "api/comment/add",
        headers: {
            authorization: token
        },
        method: 'post',
        data: {
            content: commentInput.value,
            id: id,
            type: 1
        }
    }).then((res) => {
        if (res.data.code == 200) {
            proxy.Message.success(res.data.msg);
            commentInput.value = "";
        }
        else {
            proxy.Message.error(res.data.msg);
        }
    })
}







</script>

<style lang="scss" scoped>
.bottom {
    height: 100px;
}

.comment-info {
    display: flex;
}

.comment-input {
    padding-top: 0px;
    text-align: left;
    width: 400px;
    height: 100px;
}

.comment-button {
    width: 100px;
    height: 50px;
}

.comment-user-time {
    display: flex;
    justify-content: space-between;
}
</style>
