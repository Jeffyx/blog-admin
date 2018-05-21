<template>
  <div class="error-page">
      <p class="error">404 NOT FOUND</p>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.error-page{
    width: 100%;
    height: 100%;
    background: url('../../assets/images/404.jpg') center no-repeat #dfbf84;
    background-size:contain;
    position: relative;
    .error{
        position: absolute;
        font-weight: 600;
        font-size: 98px;
        margin:0;
        color: #409eff;
        line-height: 1;
        width: 1000px;
        text-align: center;
        height: 98px;
        top:374px;
        left:50%;
        margin-left: -500px;
       
    }
}
</style>

