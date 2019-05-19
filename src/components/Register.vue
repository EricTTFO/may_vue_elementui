<template>
    <div class="login">
        <div class="container">
            <div class="avatar">
                <!-- 需要放入用户登录的头像图片 -->
                <img src="../assets/register.jpg" alt="">
            </div>
            <!-- 需要表单元素 -->
            <el-form :model="registerForm" label-width="100px" class="demo-ruleForm">
                <el-form-item>
                    <el-input v-model="registerForm.username" prefix-icon="myicon myicon-user" placeholder='请输入账号'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="registerForm.password" prefix-icon="myicon myicon-key" placeholder='请输入密码'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="registerForm.password" prefix-icon="myicon myicon-key" placeholder='请确认密码'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round class='login-btn'>注册</el-button>
                </el-form-item>
                <div class="fr"><router-link to="/login">已有账号,马上登录</router-link></div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            registerForm:{
                username:'',
                password:''
            }
        }
    },
    created:function(){
        //每当显示注册页面时,先从VUEX中读取数据保存到username中
        this.registerForm.username = this.$store.state.username;
    },
    watch:{
        'registerForm.username':function(username){
            // console.log('用户填写了'+username);
            this.$store.state.username = username;
        }
    }
}
</script>

<style lang="scss" scoped>
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

