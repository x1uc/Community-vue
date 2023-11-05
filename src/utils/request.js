import axios, { formToJSON } from "axios";
import Message from "./message";

const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJSON = "application/json"
const instance = axios.create({
    baseURL: "/api",
    timeout: 5 * 1000,
})

//请求前过滤器 
instance.interceptors.request.use((config) => {
    console.log("请求前过滤器");
    return config;
}, (error) => {
    Message.error("请求发送失败！");
    return Promise.reject("请求发送失败！");
});

//请求后过滤器
instance.interceptors.response.use((response) => {

}, (error) => {

});

const request = (config) => {
    console.log("look1111");
    const { url, params, dataType, errorCallback } = config;
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
    }
    return instance.post(url, formData, {
        headers: headers,
        errorCallback: errorCallback
    }).catch(error => {
        Message.error("请求失败");
    });
}

export default request;