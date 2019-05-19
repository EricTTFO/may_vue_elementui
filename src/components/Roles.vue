<template>
    <div class="roles">
    <el-table
    border
    :data="roleData"
    style="width: 100%">
        <el-table-column type="expand">
        <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
                <!-- 遍历顶级权限,一个权限独占一行 -->
                <el-row v-for="level0 in scope.row.children" :key="level0.id">
                    <el-col :span="3">
                        <el-tag closable @close="deleteAuth(scope.row,level0.id)">{{level0.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="21">
                        <!-- 遍历2级权限, 每个2级权限独占一行 -->
                        <el-row v-for="level1 in level0.children" :key="level1.id">
                            <el-col :span="3">
                                <el-tag closable @close="deleteAuth(scope.row,level1.id)" type="success">{{level1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="21">
                                <!-- 遍历3级权限,每个三级权限都是一个标签 -->
                                <el-tag closable @close="deleteAuth(scope.row,level2.id)" type="danger" v-for="level2 in level1.children" :key="level2.id">
                                    {{level2.authName}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
        prop="id"
        label="#"
        width="80px">
        </el-table-column>
        <el-table-column
        prop="roleName"
        label="角色名称">
        </el-table-column>
        <el-table-column
        prop="roleDesc"
        label="角色描述">
        </el-table-column>
        <el-table-column
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit"></el-button>
                <el-button type="primary" icon="el-icon-delete"></el-button>
                <el-button type="primary" icon="el-icon-check" @click="initGrantForm(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 给角色分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="grantDialog">
    <el-form :model="grantForm" label-width="80px">
        <div class="tree-container">
            <el-tree
            :data="authData"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expand-all="true"
            :default-checked-keys="selectedAuth"
            :props="defaultProps">
            </el-tree>
        </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="grantDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitGrantForm">确 定</el-button>
    </div>
    </el-dialog>
    </div>
</template>

<script>
import {getRoleList,deleteRoleAuth,getAuthTree,grantRole} from "@/api"
export default {
    data:function(){
        return {
            roleData:[],
            grantDialog:false,
            grantForm:{},
            authData:[],
            selectedAuth:[],
            defaultProps:{
                children:'children',
                label:'authName'
            },
            currentRid:''
        }
    },
    methods:{
        submitGrantForm:function(){
            //获得当前角色id
            // console.log(this.currentRid)
            //获得所有选中的权限id
            // console.dir(this.$refs.tree.getCheckedKeys().join(','))
            grantRole(this.currentRid,this.$refs.tree.getCheckedKeys().join(',')).then(res=>{
                // console.dir(res)
                if(res.meta.status == 200){
                    //关闭当前对话框
                    this.grantDialog=false;
                    //刷新当前角色列表
                    this.initList()
                }
                //给出提示信息
                this.$message(res.meta.msg)
            })
        },
        initGrantForm:function(row){
            //初始化正在操作的角色id
            this.currentRid = row.id
            // 初始化已选中的权限数组
            this.selectedAuth = []
            // 请求所有的权限信息 加载到树形结构的数据源中
            getAuthTree().then(res=>{
                console.dir(res)
                this.authData = res.data
            })
            // 根据当前角色已经具备哪些权限 
            // console.dir(auths)
            //遍历当前角色权限 把所有权限id抽出来放到 selectedAuth数组中
            row.children.forEach(level0=>{
                this.selectedAuth.push(level0.id)
                level0.children.forEach(level1=>{
                    this.selectedAuth.push(level1.id)
                    level1.children.forEach(level2=>{
                        this.selectedAuth.push(level2.id)
                    })
                })
            })
            // console.dir(this.selectedAuth)
            //显示对话框
            this.grantDialog = true
            //初始化表单数据
        },
        initList:function(){
            //发起请求,把数据保存到当前组件中
            getRoleList().then(res=>{
                console.dir(res.data)
                this.roleData = res.data
            })
        },
        deleteAuth:function(row,aid){
            // console.dir(row)
            // console.log(row.id,aid)
            //发起请求,删除对应权限
            deleteRoleAuth(row.id,aid).then(res=>{
                // console.dir(res)
                // 1、判断删除操作的结果
                if(res.meta.status==200){
                    //2、重新渲染当前角色的权限信息
                    row.children = res.data
                }
                //给出提示信息
                this.$message(res.meta.msg)
            })
        }
    },
    created:function(){
        this.initList()
    }
}
</script>

<style lang="scss" scoped>
.roles {
  .el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .tree-container {
    height: 300px;
    overflow: auto;
  }
}
</style>
