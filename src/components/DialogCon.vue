<template>
    <div>
        <el-dialog :model-value="show" :title="title" width="30%" height="100%" :show-close="true"
            :before-close="close">
            <div class="dialog-body">
                <slot></slot>
            </div>
            <template v-if="(buttons) && (buttons.length > 0) || showCancle">
                <div class="dialog-footer">
                    <el-button :type="primary" @click="close" v-if="showCancle"> 取消</el-button>
                    <el-button v-for=" item  in  buttons " :type="item.type" @click="item.click" :key="item.type">
                        {{ item.text }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: "",
    },
    showClose: {
        type: Boolean,
        default: true
    },
    buttons: {
        type: Array,
    },
    showCancle: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits();
const close = () => {
    emit("close");
}

</script>

<style lang="scss" scoped>
.dialog-footer {
    text-align: right;
}
</style>
