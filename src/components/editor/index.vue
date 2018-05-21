<template>
  <div class="editor-container">
    <div ref="editor" style="text-align:left"></div>
    <div class="apply" @click="submit">提交</div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      editorContent: "爱的色放卡三等奖法师打飞机"
    };
  },
  methods: {
    getContent: function() {
      alert(this.editorContent);
    },
    submit() {
        console.log(this.editor.txt.html());
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
     this.editor.create();
     this.editor.$textElem.attr("contenteditable", true);
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
        console.log(result);
      }
    };
  },
  watch:{
  
  }
};
</script>
<style lang="scss" scoped>
.editor-container {
  width: 1000px;
}
</style>


