<template>
  <!--    action="https://jsonplaceholder.typicode.com/posts/"-->
  <el-upload
    ref="upload"
    :auto-upload="true"
    :before-upload="onBeforeUpload"
    :data="uploadData"
    :file-list="files"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    accept=".xlsx,.xls"
    action="/upload/selectExam"
    class="upload-demo"
    drag
    multiple>

    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
    <!--    <el-button size="small" type="primary">点击上传</el-button>-->
  </el-upload>

</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      files: '',
      uploadData: []
    }
  },
  methods: {
    uploadFile(file) {
      this.axios({
        method: 'post',
        url: '/upload/test',
        data: {
          file: this.uploadData
        }
      }).then(response => {
        console.log(response)
      })
    },
    onBeforeUpload(file) {
      const isExcel = file.type === 'xlsx' || 'xls'
      const fileSize = file.size / 1024 / 1024 < 10

      if (!isExcel) {
        this.$message.error('只能是excel文件')
      }
      if (!fileSize) {
        this.$message.error('上传文件大于10M')
      }
      return isExcel && fileSize
    }
  }

}
</script>

<style scoped>

</style>
