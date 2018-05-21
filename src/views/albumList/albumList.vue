<template>
 <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>相册管理</el-breadcrumb-item>
        <el-breadcrumb-item>相册列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-breadcrum">
       <div class="album-list">
        我是相册
        </div>
    </el-col>
  
 </el-row>
   
</template>
<script>
export default {};
</script>
