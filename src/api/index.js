// axios通信专用函数库文件
import axios from 'axios'

// 希望设置一个 基础地址 能够省去将来填写很长URL的麻烦

axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1'
// 添加一个请求拦截器 发起任何请求都会先做请求拦截器 包括login verify
axios.interceptors.request.use(function (config) {
    // 发送请求前做的事情
    // 读取本地token数据
    // 添加到 Authorization=token 
    let token = localStorage.getItem('token');
    if(token){
        // 如果已经登录 再携带token作请求
        config.headers['Authorization'] = token
    }
    // 如果还未登录 本地没有保存token 不作请求头的设置
    return config;
}, function (error) {
    // 请求失败时做的事
    return Promise.reject(error);
});

// 封装对各个接口的请求函数
export const verify = function(dataObj){
    return axios.post('login',dataObj).then(res=>res.data);
}

export const getUserList = function(dataObj){
    return axios.get('users',dataObj).then(res=>res.data);
}

export const addUser = function(dataObj){
    return axios.post('users',dataObj).then(res=>res.data);
}

export const getUserById = function(id){
    return axios.get(`users/${id}`).then(res=>res.data);
}

export const editUser = function(dataObj){
    return axios.put(`users/${dataObj.id}`,dataObj).then(res=>res.data);
}

export const deleteUserById = function(id){
    return axios.delete(`users/${id}`).then(res=>res.data);
}

export const getRoleList = function(){
    return axios.get(`roles`).then(res=>res.data);
}

export const grantUser = function(dataObj){
    return axios.put(`users/${dataObj.id}/role`,dataObj).then(res=>res.data);
}

export const getAuthList = function(){
    return axios.get('rights/list').then(res=>res.data);
}

export const deleteRoleAuth = function(rid,aid){
    return axios.delete(`roles/${rid}/rights/${aid}`).then(res=>res.data);
}

export const getAuthTree = function(){
    return axios.get('rights/tree').then(res=>res.data);
}

export const grantRole = function(rid,aids){
    return axios.post(`roles/${rid}/rights`,{rids:aids}).then(res=>res.data);
}

export const changeUserState = function(uid,type){
    return axios.put(`users/${uid}/state/${type}`).then(res=>res.data);
}

export const getMenus = function(){
    return axios.get('menus').then(res=>res.data);
}

export const getGoodList = function(dataObj){
    return axios.get('goods',{params:dataObj}).then(res=>res.data);
}

export const getCategoryList = function(dataObj){
    return axios.get('categories',{params:dataObj}).then(res=>res.data);
}

export const addCategory = function(dataObj){
    return axios.post('categories',dataObj).then(res=>res.data);
}

export const addGood = function(dataObj){
    return axios.post('goods',dataObj).then(res=>res.data);
}