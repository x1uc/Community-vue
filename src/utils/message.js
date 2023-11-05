import { ElMessage } from "element-plus";


const message = {
    error: (msg, callback) => {
        ElMessage({
            type: "error",
            message: msg,
            duration: 2000,
            onClose: () => {
                if (callback)
                    callback();
            }
        })
    },
    success: (msg, callback) => {
        ElMessage({
            type: "seccess",
            message: msg,
            duration: 2000,
            onClose: () => {
                if (callback)
                    callback();
            }
        })
    },
    info: (msg, callback) => {
        ElMessage({
            type: "seccess",
            message: msg,
            duration: 2000,
            onClose: () => {
                if (callback)
                    callback();
            }
        })
    },
    warning: (msg, callback) => {
        ElMessage({
            type: "warning",
            message: msg,
            duration: 2000,
            onClose: () => {
                if (callback)
                    callback();
            }
        })
    }
}

export default message;