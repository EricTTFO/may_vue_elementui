<template>
    <div>
        <!-- 添加商品分类按钮 -->
        <el-button type="success" @click="initAddForm">新增分类</el-button>
        <!-- 树状结构 -->
        <tree-grid
        :treeStructure="true"
        :columns="columns"
        :data-source="dataSource"
        >
        </tree-grid>

        <!-- 新增分类对话框 -->
        <el-dialog title="新增分类" :visible.sync="addDialog">
        <el-form :model="addForm" label-width="80px">
            <el-form-item label="分类名称">
                <el-input v-model="addForm.cat_name" disabledautocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
                <el-cascader
                :options="options"
                v-model="selectedOptions"
                :props="props">
                </el-cascader>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import {getCategoryList,addCategory} from "@/api"
import TreeGrid from "@/components/TreeGrid.vue"
export default {
    components:{
        TreeGrid
    },
    data:function(){
        return {
            dataSource: [],
            columns: [{
            text: '分类名称',
            dataIndex: 'cat_name',
            width: ''
            }, {
            text: '是否有效',
            dataIndex: 'cat_deleted',
            width: ''
            }, {
            text: '排序',
            dataIndex: 'cat_level',
            width: ''
            }],
            addDialog:false,
            addForm:{
                cat_name:'',
                cat_level:'',
                cat_pid:''
            },
            options:[],
            selectedOptions:[],
            // 设定级联选择器的字段
            props:{
                value:'cat_id',
                label:'cat_name'
            }
        }
    },
    methods:{
        initAddForm:function(){
            //初始化级联选择器数据 2级分类信息
            this.selectedOptions=[];
            getCategoryList({type:2}).then(res=>{
                // console.dir(res)
                this.options = res.data
            })
            //显示对话框
            this.addDialog = true;
        },
        submitAddForm:function(){
            //当点击提交按钮时,需要获取 cat_pid cat_level cat_name
            //创建顶级分类 不会选中任何的分类作为父级
            if(this.selectedOptions.length == 0){
                //要创建一个顶级分类
                this.addForm.cat_pid = 0;
                this.addForm.cat_level = 0;
            }else if(this.selectedOptions.length == 1){
                //要创建一个二级分类
                this.addForm.cat_pid = this.selectedOptions[0];
                this.addForm.cat_level = 1;
            }else if(this.selectedOptions.length == 2){
                //要创建一个三级分类
                this.addForm.cat_pid = this.selectedOptions[1];
                this.addForm.cat_level = 2;
            }
            //发起请求,提交数据
            addCategory(this.addForm).then(res=>{
                // console.dir(res)
                if(res.meta.status == 201){
                    //关闭当前对话框
                    this.addDialog = false;
                    //刷新当前分类列表
                    this.initList()
                    //清空addForm数据
                    this.addForm={
                        cat_name:'',
                        cat_level:'',
                        cat_pid:''
                    }
                }
                //给出提示信息
                this.$message(res.meta.msg)
            })
        },
        initList:function(){
            //请求后端接口,把数据装载到 dataSource
            getCategoryList().then(res=>{
                // console.dir(res)
                this.dataSource = res.data
            })
        }
    },
    created:function(){
        this.initList()
    }
}
</script>

<style scoped>
</style>
