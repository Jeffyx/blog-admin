<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章评论</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24">
       <el-col :span="24">
        <el-form :inline="true">
          <el-form-item>
            <el-input  placeholder="请输入文章名称" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addNewComment">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table
        :data="tableData"
         ref="multipleTable"
         tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          >
           <el-table-column
              type="selection"
              width="55">
            </el-table-column>
           <el-table-column
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              label="姓名"
              prop="name"
              width="180">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import {getArticalComment} from '@/api/app.js'
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          comment:''
        }
      ],
      articalId:''
    };
  },
  computed: {},
  created() {
    this.articalId = this.$route.query.id
    getArticalComment(this.articalId).then(response=>{
      console.log(response);
    })
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(){

    },
    addNewComment(){
      
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

