<template>
    <div class="home">

        <el-container>
            <el-aside width="auto">
                <div class="logo"></div>
                <!-- 折叠菜单 start -->
                <el-col :span="12">

                    <el-menu
                            :router='true'
                            :collapse="isCollapse"
                            default-active="1"
                            class="el-menu-admin"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <router-link to="/Users">用户管理</router-link>
                        <router-link to="/Rights">权限管理</router-link>
                        <router-link to="/Roles">角色管理</router-link>
                        <router-link to="/Goods">产品展示</router-link>
                        <router-link to="/Categories">新增分类</router-link>
                        <router-link to="/AddGood">添加商品</router-link>
                        <el-submenu :index="item.path" v-for="item in menus" :key="item.id">

                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.authName}}</span>

                            </template>
                            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">{{subItem.authName}}</el-menu-item>
                        </el-submenu>
                    </el-menu>

                </el-col>
                <!-- 折叠菜单 stop -->

            </el-aside>
            <el-container>
                <el-header>
                    <i class="myicon myicon-menu toggle-btn" @click="toggleMenu"></i>
                    <div class="system-title">电商后台管理系统</div>
                    <div class="welcome">欢迎您,{{$store.state.username}}</div>
                    <el-button type="text" @click="logout">退出</el-button>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {getMenus} from "@/api"
    export default {
        data:function(){
            return {
                isCollapse:false,
                menus:[]
            }
        },
        methods:{
            toggleMenu:function(){
                this.isCollapse = !this.isCollapse
            },
            logout:function(){
                //删除本地化的token
                localStorage.removeItem('token')
                //强制让用户访问login
                this.$router.push('/login');
            }
        },
        created:function(){
            //当后台首页显示时,请求当前用户所具有的功能/权限
            getMenus().then(res=>{
                this.menus = res.data
            })
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        height: 100%;
        .el-menu-admin:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
        .el-container {
            height: 100%;
        }
        .el-aside {
            background-color: #545c64;
        }
        .el-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #545c64;
        }
        .logo {
            height:60px;
            background: url(../assets/logo.png);
            background-size: cover;
            background-color: #989898;
        }
        .toggle-btn {
            font-size: 36px;
            color: #989898;
            cursor: pointer;
            line-height: 60px;
        }
        .system-title {
            font-size: 28px;
            color: white;
        }
        .welcome{
            color: white;
        }
    }
</style>
