<template>
    <div class="login">
        <div class="container">
            <div class="avatar">
                <!-- 需要放入用户登录的头像图片 -->
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 需要表单元素 -->
            <el-form :model="loginForm" :rules='rules' ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user" placeholder='请请输入账号'></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key" placeholder='请请输入密码'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round class='login-btn' @click="submitLogin('loginForm')">登录</el-button>
                </el-form-item>
                <div class="fr"><router-link to="/register">马上注册</router-link></div>
            </el-form>
        </div>
    </div>
</template>

<script>
// 引入api index.js中的需要用到的函数
import {verify} from '../api/index.js'
export default {
    data:function(){
        return {
            loginForm:{
                username:'',
                password:''
            },
            // 表单验证规则
            rules:{
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        submitLogin:function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 调用verify方法 把登录信息发送到接口中
                    // console.dir(verify(this.loginForm))
                    // console.log('准备发起请求')
                    verify(this.loginForm).then((res)=>{
                        if(res.meta.status == 200){
                            this.$message('欢迎登录');
                            // console.log(res.data.token)
                            // 把token存储在浏览器上 以供后续的请求使用
                            localStorage.setItem('token',res.data.token);
                            // VUEX $store.state
                            // console.log(res.data.username)
                            this.$store.state.username = res.data.username
                            this.$router.push('/');
                        }else{
                            this.$message(res.meta.msg);
                        }
                    });
                } else {
                    this.$message('请检查表格');
                    return false;
                }
            });
        }
    },
    watch:{
        'loginForm.username':function(username){
            // console.log('用户填写了'+username);
            this.$store.state.username = username;
        }
    },
    created:function(){
        //每当显示注册页面时,先从VUEX中读取数据保存到username中
        this.loginForm.username = this.$store.state.username;
    }
}
</script>

<style lang="scss" scoped>
.fr{
    float:right;
}
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

