<template>
    <div>
        <!-- 权限列表 -->
        <el-table
        :data="authData"
        border
        style="width: 100%">
            <el-table-column
            prop="id"
            label="id"
            width="80">
            </el-table-column>
            <el-table-column
            label="权限名称">
                <template slot-scope="scope">
                    <span>{{scope.row.authName | levelTab(scope.row.level)}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit"></el-button>
                    <el-button type="primary" icon="el-icon-delete"></el-button>
                    <el-button type="primary" icon="el-icon-check"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {getAuthList} from '@/api'
export default {
    data:function(){
        return {
            authData:[]
        }
    },
    methods:{
        initList:function(){
            getAuthList().then(res=>{
                // console.dir(res)
                var result = [];
                // 无限极排序 递归 根据一个元素的id 找pid与之相等的子元素
                var levelSort = function(arr,id=0){
                    arr.forEach(function(item){
                        // 遍历数组,比较当前元素的 pid 是否等于这一层传入的id
                        if(item.pid == id){
                            //说明这个元素是目前要找的子元素 需要保存到结果中
                            result.push(item)
                            //进入递归入口
                            levelSort(arr,item.id)
                        }
                    })
                    //递归出口 遍历的结束就是递归出口
                    return result;
                }
                this.authData = levelSort(res.data)
                console.dir(this.authData)
            })
        }
    },
    created:function(){
        this.initList()
    },
    filters:{
        levelTab:function(authName,level){
            var str = ''
            for(var i=0;i<level;i++){
                str+='----'
            }
            return str+authName;
        }
    }
}
</script>

<style scoped>
</style>
