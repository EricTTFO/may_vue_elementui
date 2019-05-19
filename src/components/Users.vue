<template>
    <div class="user">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户信息搜索栏 -->
        <el-input placeholder="请输入内容" v-model='query' @keydown.native.enter="initList" class="search-input input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
        </el-input>
        <el-button type="success" plain  @click="addDialog = true">新增用户</el-button>

        <!-- 管理人员信息表格 -->
        <!-- 根据自己的需要 为表格定义列 并且说明每一列对应哪个字段 -->
        <!-- id 用户名 邮箱 电话 用户状态 操作 -->
        <!-- 把响应中的user数据填充到 -->
        <el-table
        :data="userData"
        border
        style="width: 100%">
            <el-table-column
            prop="id"
            label="id"
            width="80">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户名"
            width="150">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
            prop="mobile"
            label="电话"
            width="150">
            </el-table-column>
            <el-table-column
            prop="mg_state"
            label="用户状态"
            width="80">
                <template slot-scope="scope">
                    <!-- 滑动开关实现 -->
                    <el-switch
                    v-model="scope.row.mg_state"
                    @change="changeState(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="initEditForm(scope.row.id)"></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
                    <el-button type="primary" icon="el-icon-check" @click="initGrantForm(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页栏 -->
        <div class="page">
        <el-pagination
        @size-change="changeSize"
        @current-change="changePage"
        :current-page="1"
        :page-sizes="[5, 20, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage">
        </el-pagination>

        <!-- 新增按钮对话框 -->
        <el-dialog title="新增用户" :visible.sync="addDialog">
        <el-form :model="addForm" label-width="80px">
            <el-form-item label="账号">
            <el-input v-model="addForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
            <el-input v-model="addForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
            <el-input v-model="addForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
            <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </div>
        </el-dialog>

        <!-- 修改按钮对话框 -->
        <el-dialog title="修改信息" :visible.sync="editDialog">
        <el-form :model="editForm" label-width="80px">
            <el-form-item label="id">
                <el-input disabled v-model="editForm.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input disabled v-model="editForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="editForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitEditForm">确 定</el-button>
        </div>
        </el-dialog>

        <!-- 分配角色对话框 -->
        <el-dialog title="修改角色" :visible.sync="grantDialog">
        <el-form :model="grantForm" label-width="80px">
            <el-form-item label="账号">
                <el-input disabled v-model="grantForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="grantForm.rid">
                    <!-- 根据所有的角色信息遍历并显示选项 -->
                    <el-option v-for="role in roles" :label="role.roleName" :value="role.id" :key="role.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="grantDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitGrantForm">确 定</el-button>
        </div>
        </el-dialog>
  </div>
    </div>
</template>

<script>
// 引入axios函数库
import {getUserList,changeUserState,addUser,getUserById,editUser,deleteUserById,getRoleList,grantUser} from '@/api'
export default {
    data:function(){
        return {
          userData:[],
          query:'',
          totalpage:0,
          pagenum:1,
          pagesize:5,
          addDialog:false,
          addForm:{
              username:'',
              password:'',
              email:'',
              mobile:''
          },
          editDialog:false,
          editForm:{},
          grantDialog:false,
          grantForm:{},
          roles:[]
        }
    },
    methods:{
        submitGrantForm:function(){
            //把grantForm发送到后端
            grantUser(this.grantForm).then(res=>{
                // console.dir(res)
                if(res.meta.status == 200){
                    this.grantDialog = false
                }
                //显示提示信息
                this.$message(res.meta.msg)
            })
        },
        initGrantForm:function(id){
            // 根据当前用户的id 查询用户目前是什么角色
            getUserById(id).then(res=>{
                this.grantForm = res.data
            })
            // 查出当前有哪些角色可供分配
            getRoleList().then(res=>{
                this.roles=res.data
            })
            this.grantDialog=true
        },
        deleteUser:function(id){
            deleteUserById(id).then(res=>{
                // console.log(res.meta)
                if(res.meta.status == 200){
                    //刷新列表
                    this.initList()
                }
                //显示提示信息
                this.$message(res.meta.msg)
            })
        },
        submitEditForm:function(){
            //把editform发送给后端
            editUser(this.editForm).then(res=>{
                // console.dir(res)
                if(res.meta.status == 200){
                    //关闭当前对话框
                    this.editDialog=false
                }
                //显示提示信息
                this.$message(res.meta.msg)
            })
        },
        initEditForm:function(id){
            // 把旧数据查出来 显示在面板中
            // 根据用户id查询现有数据
            // console.log(id)
            getUserById(id).then(res=>{
                // console.dir(res)
                //显示对话框 显示 4个 id username email mobile
                // 初始化修改对话框数据
                this.editForm = res.data
                this.editDialog=true
            })
        },
        submitAddForm:function(){
            //将数据发送到后端
            addUser(this.addForm).then(res=>{
                // console.dir(res);
                if(res.meta.status == 201){
                    //清空当前对话框
                    this.addForm={
                        username:'',
                        password:'',
                        email:'',
                        mobile:''
                    }
                    //自动搜索最新用户数据
                    this.query = res.data.username
                    // 初始化当前列表
                    this.initList()
                    //关闭对话框
                    this.addDialog = false
                }
                //给出提示信息
                this.$message(res.meta.msg)
            })
        },
        changeState:function(row){
            //切换一次用户的状态数据
            // 开关组件 当点击时会自动切换 双向绑定数据
            // console.dir(row)
            changeUserState(row.id,row.mg_state).then(res=>{
                console.dir(res)
                if(res.meta.status != 200){
                    //切换状态失败时,把当前用户数据中的mg_state切换回来
                    row.mg_state = !row.mg_state
                }
                //显示提示信息
                this.$message(res.meta.msg)
            })
        },
        changeSize:function(size){
            this.pagesize = size;
            this.initList();
        },
        changePage:function(page){
            this.pagenum = page
            this.initList();
        },
        initList:function(){
            //调用axios函数库 发起请求获得所有管理员数据
            getUserList({params:{query:this.query,pagenum:this.pagenum,pagesize:this.pagesize}}).then(res=>{
                console.dir(res.data);
                // 保存用户数据
                this.userData = res.data.users;
                // 保存总记录数
                this.totalpage= res.data.total
                // 保存当前页码
                this.pagenum = res.data.pagenum
            })
        }
    },
    created:function(){
        this.initList()
    }
}
</script>

<style lang="scss" scoped>
.user {
  .margin-20 {
    margin: 20px 0;
  }
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
</style>
