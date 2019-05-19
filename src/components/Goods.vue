<template>
    <div>
        <!-- 添加商品按钮 -->
        <el-button type="success" @click="$router.push('/addGood')">新增商品</el-button>
        <!-- 商品列表 -->
        <el-table
        :data="goodData"
        border
        style="width: 100%">
            <el-table-column
            prop="goods_id"
            label="#"
            width="80">
            </el-table-column>
            <el-table-column
            prop="goods_name"
            label="商品名称">
            </el-table-column>
            <el-table-column
            prop="goods_price"
            label="商品价格">
            </el-table-column>
            <el-table-column
            prop="goods_number"
            label="商品数量">
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

        <!-- 分页栏 -->
        <el-pagination
        @size-change="changeSize"
        @current-change="changePage"
        :current-page="1"
        :page-sizes="[5, 20, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage">
        </el-pagination>
    </div>
</template>
<script>
import {getGoodList} from "@/api"
export default {
    data:function(){
        return {
            goodData:[],
            // 分页功能相关变量
            pagenum:1,
            pagesize:5,
            totalpage:0
        }
    },
    methods:{
        changeSize:function(size){
            this.pagesize = size;
            this.initList();
        },
        changePage:function(page){
            this.pagenum = page
            this.initList();
        },
        initList:function(){
            //请求商品列表接口 
            getGoodList({query:'',pagenum:this.pagenum,pagesize:this.pagesize}).then(res=>{
                console.dir(res.data)
                this.goodData = res.data.goods
                this.totalpage = res.data.total
                this.pagenum = res.data.pagenum
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
