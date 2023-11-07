import axios from "axios";
import Message from "./message";

const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJSON = "application/json"
const instance = axios.create({
    baseURL: "/api",
    timeout: 5 * 1000,
})
let token = sessionStorage.getItem("token");
//请求前过滤器 
instance.interceptors.request.use(config => {
    console.log("请求前过滤！！！");
    if (token) config.headers['authorization'] = token
    return config
}, (error) => {
    Message.error("请求发送失败！");
    return Promise.reject("请求发送失败！");
});

//请求后过滤器
instance.interceptors.response.use(function (response) {
    // 判断执行结果
    if (!response.data.success) {
        return Promise.reject(response.data.errorMsg)
    }
    return response.data;
}, function (error) {
    // 一般是服务端异常或者网络异常
    console.log("requestjs" + error)
    if (error.response.status == 401) {
        // 未登录，跳转
        setTimeout(() => {
            location.href = "/login.html"
        }, 200);
        return Promise.reject("请先登录");
    }
    return Promise.reject("服务器异常");
});

const request = (config) => {
    const { method, url, params, dataType, errorCallback, authorization } = config;
    let contentType = contentTypeForm;
    let formData = new FormData();
    for (let key in params) {
        formData.append(key, params[key] == undefined ? "" : params[key]);
    }
    if (dataType != null && dataType === "json") {
        contentType = contentTypeJSON;
    }
    let headers = {
        'Content-Type': contentType,
        'X-Requested-With': 'XMLHttpRequest',
        authorization: authorization
    }
    return instance({
        url: url,
        method: method,
        data: formData,
        headers: headers,
        errorCallback: errorCallback,
    }).then({

    }).catch((res) => {
        return console.log(res);
    });
}

export default request;