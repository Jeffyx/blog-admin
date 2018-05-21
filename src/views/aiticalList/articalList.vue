<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main operate-content">
      <!-- 分类查询及新增 -->
      <el-col :span="24">
        <el-form :inline="true">
          <el-form-item>
            <el-input  placeholder="请输入文章名称" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addNewArtical">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 分类主列表 -->
      <el-col :span="24">
         <el-table
         ref="multipleTable"
         tooltip-effect="dark"
          :data="articalListData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort = "{prop:'title'}"
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
              prop="title"
              width="180"
              label="文章标题"
              >
            </el-table-column>
          
            <el-table-column
              type="expand"
              width="180"
              label="摘要"
              >
                <template slot-scope="props">
                  <el-form label-position="left" inline class="table-expand">
                      <el-form-item label="文章摘要">
                        <span>{{ props.row.abstract }}</span>
                      </el-form-item>
                  </el-form>
                </template>
             </el-table-column>
             <el-table-column
              prop="author"
              width="140"
              label="作者">
            </el-table-column>
            <el-table-column
              prop="create_time"
               width="180"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="category"
              label="分类"
              width="180"
              :filters="categoryFiltersData"
              :filter-method="filterCategory"
              filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag disable-transitions>{{scope.row.category}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                 <el-button
                size="mini"
                type="primary"
                @click="linkToArticalDetail(scope.$index, scope.row)">详情</el-button>
             
              <el-button
                size="mini"
                @click="linkToArticalEditor(scope.$index, scope.row)">
                编辑
              </el-button>
               <el-button
                size="mini"
                type='info'
                @click="linkToArticalComment(scope.$index, scope.row)">
                评论
              </el-button>
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
      :total="totalArticalListData.length">
    </el-pagination>
  </div>
    </el-col>
  </el-row>
 
  
</template>
<script>
import { addCategory,deleteArtical } from "@/api/app";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Message } from "element-ui";
import { duplicate } from "@/utils/base";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      dialogFormVisible: false,
      totalArticalListData: [], // 文章总数据
      articalListData: [], // 文章分页数据
      formLabelWidth: "80px",
      categoryApplyData: {
        alias: "",
        category: "",
        id: ""
      },
      editType: "add",
      categoryFiltersData: [] // 分类筛选数据
    };
  },
  computed: {
    ...mapGetters(["articalList"])
  },
  created() {
    // 获取分类信息(注意异步)
    this.asyncGetArticalList().then(() => {
      this.pageOperate(this.currentPage, this.pageSize);
    });
  },
  methods: {
    ...mapActions([
      "GetCategory",
      "DeleteCategory",
      "EditCategory",
      "GetAticalList"
    ]),
    ...mapMutations(["SORT_CATEGORY"]),
    filterCategory(value, row) {
      return row.category === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    linkToArticalDetail(index, articalInfo) {
      console.log("articalInfo", articalInfo.id);
      this.$router.push({
        path: "/artical/articalOperate",
        query: { id: articalInfo.id, type: "detail" }
      });
    },
    linkToArticalEditor(index, articalInfo) {
      this.$router.push({
        path: "/artical/articalOperate",
        query: { id: articalInfo.id, type: "edit" }
      });
    },
    linkToArticalComment(index, articalInfo) {
      this.$router.push({
        path: "/artical/articalComment",
        query: { id: articalInfo.id, type: "comment" }
      });
    },
    addNewArtical() {
      this.$router.push({
        path: "/artical/articalOperate",
        query: { type: "add" }
      });
    },
    pageOperate(currentPage, pageSize) {
      const CATEGORY_INDEX = (currentPage - 1) * pageSize;
      this.articalListData = this.totalArticalListData.slice(
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
      console.log("删除文章", row);
      this.$confirm("是否删除该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteArtical(row.id).then(() => {
            // 执行删除成功后更新页面
            this.asyncGetArticalList().then(() => {
      this.pageOperate(this.currentPage, this.pageSize);
    });
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

    openEditDialog(index, row) {
      this.dialogFormVisible = true;
      this.editType = "edit";
      this.categoryApplyData = row;
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
          this.asyncGetArticalList().then(() => {
            this.totalArticalListData = [...this.articalList];
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
    intCategoryFiltersData(data) {
      // [{ text: '从现在', value: '从现在' }, { text: '公司', value: '公司' }]
      let intialFilterArray = [];
      data.forEach(item => {
        intialFilterArray.push({
          text: item.category,
          value: item.category
        });
      });
      console.log(this.totalArticalListData);
      return duplicate(intialFilterArray);
    },
    async asyncGetArticalList() {
      await this.GetAticalList({
        category_id: "",
        articalAmount: 10000000000000000,
        pageNumber: 1
      });
      this.totalArticalListData = [...this.articalList];
      this.categoryFiltersData = this.intCategoryFiltersData(
        this.totalArticalListData
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.table-expand {
  padding-left: 70px;
}
</style>

