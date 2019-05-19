<template>
    <div>
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
            <el-step title="步骤 5"></el-step>
        </el-steps>

         <el-tabs @tab-click="handleClick" tab-position="left">
            <el-tab-pane label="商品名称" name="first">
                <el-form ref="form" :model="addForm" label-width="80px">
                    <el-form-item label="商品名称">
                        <el-input v-model="addForm.goods_name"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品分类" name="second">
                <el-form ref="form" :model="addForm" label-width="80px">
                    <el-form-item label="商品分类">
                        <el-cascader
                            :props="prop"
                            :options="options"
                            v-model="selectedOptions">
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品价格" name="third">
                <el-form ref="form" :model="addForm" label-width="80px">
                    <el-form-item label="商品价格">
                        <el-input v-model="addForm.goods_price"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品库存" name="fourth">
                <el-form ref="form" :model="addForm" label-width="80px">
                    <el-form-item label="商品库存">
                        <el-input v-model="addForm.goods_number"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品重量" name="fifth">
                <el-form ref="form" :model="addForm" label-width="80px">
                    <el-form-item label="商品重量">
                        <el-input v-model="addForm.goods_weight"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 提交新商品数据按钮 -->
                <el-button type="success" @click="submitAddForm">确定</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {getCategoryList,addGood} from "@/api"
export default {
    data:function(){
        return {
            active:0,
            addForm:{},
            options:[],
            selectedOptions:[],
            prop:{
                label:'cat_name',
                value:'cat_id'
            }
        }
    },
    methods:{
        submitAddForm:function(){
            //检查和处理好所有的必要数据
            // console.dir(this.addForm)
            //从级联选择器获取 选中的 3级分类id
            this.addForm.goods_cat = this.selectedOptions.join(',')

            //向服务器发送请求
            addGood(this.addForm).then(res=>{
                // console.dir(res)
                if(res.meta.status == 201){
                    this.$router.push('/goods')
                }
                //提示信息
                this.$message(res.meta.msg)
            })
        },
        handleClick:function(tab){
            switch (tab.name) {
                case 'first':
                    this.active=0;
                    break;
                case 'second':
                    this.active=1;
                    break;
                case 'third':
                    this.active=2;
                    break;
                case 'fourth':
                    this.active=3;
                    break;
                case 'fifth':
                    this.active=4;
                    break;
            }
        }
    },
    created:function(){
        //在当前组件 实例化后 查询所有的商品分类 3级
        getCategoryList({type:3}).then(res=>{
            console.dir(res.data)
            this.options = res.data
        })
    }
}
</script>

<style scoped>
</style>
