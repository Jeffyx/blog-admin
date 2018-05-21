<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章分类</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main operate-content">
      <!-- 分类查询及新增 -->
      <el-col :span="24">
        <el-form :inline="true">
          <el-form-item>
            <el-input  placeholder="请输入分类名称" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="openAddnewDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 分类主列表 -->
      <el-col :span="24">
         <el-table
         ref="multipleTable"
         tooltip-effect="dark"
          :data="categoryData"
          style="width: 100%"
          @sort-change="sort"
          @selection-change="handleSelectionChange"
          :default-sort = "{prop:'name'}"
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
              prop="category"
              label="分类名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="alias"
              label="别名">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
              <el-button
                size="mini"
                @click="openEditDialog(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
         </el-table>
      </el-col>
    </el-col>
    <el-col style="text-align:right;padding-top:8px;">
       <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="selectThisPage"
      :current-page.sync="currentPage"
      :page-size="5"
      layout="sizes, prev, pager, next"
      :total="totalCategoryData.length">
    </el-pagination>
  </div>
    </el-col>

     <!-- 模态框 -->
     <el-dialog title="文章分类" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="categoryApplyData">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="categoryApplyData.category" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类别名" :label-width="formLabelWidth">
            <el-input v-model="categoryApplyData.alias" auto-complete="off"></el-input>
          </el-form-item>
    
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="confirmAbort">取 消</el-button>
            <el-button type="primary" @click="confirmApply">确 定</el-button>
          </div>
    </el-dialog>
  </el-row>
 
  
</template>
<script>
import { addCategory } from "@/api/app";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Message } from "element-ui";
export default {
  data() {
    return {
      msg: "hello vue",
      currentPage: 1,
      pageSize: 10,
      dialogFormVisible: false,
      totalCategoryData: [], // 分类总数据
      categoryData: [], // 分类分页数据
      formLabelWidth: "80px",
      categoryApplyData: {
        alias: "",
        category: "",
        id: ""
      },
      editType: "add"
    };
  },
  computed: {
    ...mapGetters(["category"])
  },
  created() {
    // 获取分类信息(注意异步)
    this.asyncGetCategory().then(() => {
      this.pageOperate(this.currentPage, this.pageSize);
    });
  },
  methods: {
    ...mapActions(["GetCategory", "DeleteCategory", "EditCategory"]),
    ...mapMutations(["SORT_CATEGORY"]),
    pageOperate(currentPage, pageSize) {
      const CATEGORY_INDEX = (currentPage - 1) * pageSize;
      this.categoryData = this.totalCategoryData.slice(
        CATEGORY_INDEX,
        CATEGORY_INDEX + pageSize
      );
    },
    handleSelectionChange() {},
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将会删除分类下面的所有文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.DeleteCategory(row).then(() => {
            // 执行删除成功后更新页面
            this.totalCategoryData = [...this.category];
            this.pageOperate(this.currentPage, this.pageSize);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageOperate(this.currentPage, this.pageSize);
    },
    selectThisPage(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.pageOperate(this.currentPage, this.pageSize);
    },
    openAddnewDialog() {
      this.categoryApplyData = {};
      this.editType = "add";
      this.dialogFormVisible = true;
    },
    openEditDialog(index, row) {
      this.dialogFormVisible = true;
      this.editType = "edit";
      this.categoryApplyData = row;
    },
    // 升降序切换order
    sort(orderInfo) {
      console.log(orderInfo.order);
      // console.log(this.category);
      // // 排序逻辑（保存至Vuex中）
      // this.SORT_CATEGORY(orderInfo.order);
      // this.pageOperate(this.currentPage, this.pageSize);
      // console.log(this.category);
    },
    confirmApply() {
      this.dialogFormVisible = false;
      if (this.editType == "add") {
        // 注意去重
        const NAME = this.categoryApplyData.category;
        const ALIAS = this.categoryApplyData.alias;
        let isExist = false;
        this.category.forEach(item => {
          if (item.category == NAME) {
            isExist = true;
            Message({
              message: `分类名${NAME}已存在！`,
              type: "error",
              duration: 3 * 1000
            });
            return;
          }
          if (item.alias == ALIAS) {
            isExist = true;
            Message({
              message: `分类别名${ALIAS}已存在！`,
              type: "error",
              duration: 3 * 1000
            });
            return;
          }
        });
        if (isExist) {
          return;
        }
        addCategory(
          this.categoryApplyData.category,
          this.categoryApplyData.alias
        ).then(data => {
          // 更新页面
          this.asyncGetCategory().then(() => {
            this.totalCategoryData = [...this.category];
            this.pageOperate(this.currentPage, this.pageSize);
          });
        });
      } else if (this.editType == "edit") {
        this.EditCategory(this.categoryApplyData);
      }
    },
    confirmAbort() {
      this.dialogFormVisible = false;
     
    },
    async asyncGetCategory() {
      await this.GetCategory();
      this.totalCategoryData = [...this.category];
    }
  },
  watch: {}
};
</script>
