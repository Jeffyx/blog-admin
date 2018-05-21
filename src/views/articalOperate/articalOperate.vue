<template>
<el-row class="warp">
   <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{breadcrumb}}</el-breadcrumb-item>
      </el-breadcrumb>
   </el-col>
  <el-col :span="24">
    <div class="artical-operate">
    <div class="artical-info">
      <el-form :label-position="labelPosition" label-width="160px" :model="articalInfo">
          <el-form-item label="文章标题">
            <el-input v-model="articalInfo.title" placeholder="请输入文章标题" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="articalInfo.author" placeholder="请输入作者名称" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="文章分类">
              <el-select v-model="categorySelectData" clearable placeholder="请选择文章分类" :disabled="disable">
                <el-option
                  v-for="(item,index) in categoryData"
                  :key="index"
                  :label="item.category"
                  :popper-append-to-body=false
                  :value="item.category">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="文章摘要">
            <el-input
             type="textarea"
              v-model="articalInfo.abstract"
               :rows="5"
               :disabled="disable"
              >
              </el-input>
          </el-form-item>
      </el-form>
    </div>
    <div class="editor-container">
      <div class="title">文章内容</div>
      <div ref="editor" style="text-align:left"></div>
    </div>
  </div>
  </el-col>
   <el-col :span="24" class="submit-button" v-if="isSubmitButtonShow">
      <el-button type="primary" @click="submit">{{buttonText}}</el-button>
   </el-col>
</el-row>
</template>
<script>
import E from "wangeditor";
import { mapGetters } from "vuex";
import {
  getCategory,
  deleteCategory,
  editCategory,
  addCategory,
  getAticalList,
  getArticalDetail,
  addArtical,
  editArtical
} from "@/api/app";
export default {
  data() {
    return {
      breadcrumb: "",
      isSubmitButtonShow: true,
      buttonText: "",
      editor: null,
      disable: false, // 是否可以输入
      operateType: "add",
      editorContent: "",
      labelPosition: "left",
      articalId: "",
      articalInfo: {},
      categoryData: [],
      categorySelectData: ""
    };
  },
  computed: {
    ...mapGetters(["category"])
  },
  methods: {
    getContent: function() {
      alert(this.editorContent);
    },
    // 提交按钮操作
    submit() {
      if (this.operateType === "add") {
        // 新增文章操作
        this.addNewArtical();
      }else if(this.operateType === "edit"){
        this.editOriginalArtical();
      }
    },
    initArticalDetail() {
      this.breadcrumb = "文章详情";
      this.disable = true;
      this.isSubmitButtonShow = false;
      this.asyncGetArticalDetail(this.articalId);
    },
    initArticalEdit() {
      this.breadcrumb = "文章编辑";
      this.disable = false;
      this.isSubmitButtonShow = true;
      this.buttonText = "确认修改";
      // 获取分类信息
      this.categoryData = this.category;
      this.asyncGetArticalDetail(this.articalId);
    },
    initArticalAdd() {
      this.breadcrumb = "添加文章";
      this.disable = false;
      this.isSubmitButtonShow = true;
      this.buttonText = "创建文章";
      // 获取分类信息
      this.categoryData = this.category;
    },
    async asyncGetArticalDetail(articalId) {
      const { data } = await getArticalDetail(articalId);
      this.articalInfo = data.article[0];
      this.editorContent = data.article[0].article;
      this.categorySelectData = data.article[0].category;
      this.editor.txt.html(this.editorContent);
    },
    addNewArtical() {
      if (!this.articalInfo.title) {
        this.$message.error("请输入文章标题！");
        return;
      }
      if (!this.articalInfo.author) {
        this.$message.error("请输入作者名称！");
        return;
      }
      if (!this.categorySelectData) {
        this.$message.error("请选择文章分类！");
        return;
      } else {
        // 获取文章分类Id
        this.category.forEach(element => {
          if (element.category == this.categorySelectData) {
            this.articalInfo.category_id = element.id;
          }
        });
      }
      if (!this.articalInfo.abstract) {
        this.$message.error("请输入文章摘要！");
        return;
      }
      // 编辑器就算不输入任何东西都存在‘<p><br></p>’
      const EDITOR_CONTENT = this.editor.txt.html();
      if (EDITOR_CONTENT == "<p><br></p>" || !EDITOR_CONTENT) {
        this.$message.error("请输入文章内容！");
        return;
      } else {
        this.articalInfo.article = EDITOR_CONTENT;
      }
      addArtical(this.articalInfo).then(response => {
        if (response.code === 200) {
          this.$message({
            message: "文章创建成功！即将返回文章列表页...",
            type: "success",
            duration:2000,
            onClose:this.backToArticalList
          })
        }
      });
    },
    editOriginalArtical(){
      if (!this.articalInfo.title) {
        this.$message.error("文章标题不能为空！");
        return;
      }
      if (!this.articalInfo.author) {
        this.$message.error("作者名称不能为空！");
        return;
      }
      if (!this.categorySelectData) {
        this.$message.error("请选择文章分类！");
        return;
      } else {
        // 获取文章分类Id
        this.category.forEach(element => {
          if (element.category == this.categorySelectData) {
            this.articalInfo.category_id = element.id;
          }
        });
      }
      if (!this.articalInfo.abstract) {
        this.$message.error("文章摘要不能为空！");
        return;
      }
      // 编辑器就算不输入任何东西都存在‘<p><br></p>’
      const EDITOR_CONTENT = this.editor.txt.html();
      if (EDITOR_CONTENT == "<p><br></p>" || !EDITOR_CONTENT) {
        this.$message.error("文章内容不能为空！");
        return;
      } else {
        this.articalInfo.article = EDITOR_CONTENT;
      }
      this.articalInfo.id = this.articalId
      editArtical(this.articalInfo).then(response => {
        if (response.code === 200) {
          this.$message({
            message: "文章修改成功！即将返回文章列表页...",
            type: "success",
            duration:2000,
            onClose:this.backToArticalList
          })
        }
      });
    },
    backToArticalList(){
      this.$router.push('/artical/list')
    }
  },
  created() {
    this.operateType = this.$route.query.type;
    this.articalId = this.$route.query.id;
    if (this.operateType === "detail") {
      this.initArticalDetail();
    } else if (this.operateType === "add") {
      this.initArticalAdd();
    } else if (this.operateType === "edit") {
      this.initArticalEdit();
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
    };

    this.editor.customConfig.uploadImgServer =
      "https://image.xiexiaoshun.com/photo/artical"; // 上传图片到服务器

    this.editor.customConfig.debug = true;
    this.editor.customConfig.zIndex = 100;
    this.editor.create();
    this.editor.$textElem.attr("contenteditable", !this.disable);
    this.editor.txt.html(this.editorContent);
    this.editor.customConfig.uploadImgHooks = {
      success(xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail(xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error(xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        // var url = result.url;
        // insertImg(url);
        // result 必须是一个 JSON 格式字符串！！！否则报错
        // console.log(result);
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.artical-operate {
  padding-left: 50px;
  padding-top: 30px;
}
.editor-container {
  position: relative;
  width: 1000px;
  padding-left: 160px;
  .title {
    position: absolute;
    width: 160px;
    text-align: left;
    left: 0;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
}
.artical-info {
  width: 1000px;
}
.submit-button {
  padding-top: 36px;
  padding-left: 566px;
}
</style>


