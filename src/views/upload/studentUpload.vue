<template>
  <div>

    <div class="container">
      <div class="content-title" style="font-size: 22px;margin-bottom: 10px">学生信息上传</div>
      <div class="plugins-tips">
        以指定格式上传.
        <a href="../../../assets/data/用户信息示例.xlsx" target="_blank">从此处查看格式规范</a>
      </div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        class="upload-demo"
        drag
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处,或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传xls或xlsx格式!</div>
      </el-upload>
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}

.pre-img {
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}

.crop-demo {
  display: flex;
  align-items: flex-end;
}

.crop-demo-btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}

.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

/*.container {*/
/*  padding: 30px;*/
/*  background: #fff;*/
/*  border: 1px solid #ddd;*/
/*  border-radius: 5px;*/
/*}*/

.plugins-tips {
  background: #eef1f6;
  padding: 20px 10px;
  margin-bottom: 20px;
}

/*.context {*/
/*  background-color: #ffffff;*/
/*  padding: 20px 20px 20px 20px;*/
/*  margin: 20px 20px 20px 20px;*/
/*}*/
</style>
