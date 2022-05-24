<template>
  <div>

    <div id="containerOne" class="container">
      <div class="content-title">上传选择题</div>
      <div class="plugins-tips">
        以指定格式上传.
        <el-link @click="downloadSelectTemp()" style="font-size: 16px">点击此处下载格式规范.</el-link>
        只能上传xls或xlsx格式!
      </div>
      <div>
        <el-upload
          ref="upload"
          :auto-upload="true"
          :before-upload="onBeforeUpload"
          :data="uploadData"
          :file-list="selectFiles"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          accept=".xlsx,.xls"
          action="/upload/selectExam"
          class="upload-demo"
          drag
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip"> 只能上传xls或xlsx格式!</div>
        </el-upload>
      </div>
    </div>

    <el-divider></el-divider>

    <!--    填空题-->
    <div id="containerOne" class="container">
      <div class="content-title">上传填空题</div>
      <div class="plugins-tips">
        以指定格式上传.
        <el-link @click="downloadBlankTemp()" style="font-size: 16px">点击此处下载格式规范.</el-link>
        只能上传xls或xlsx格式!
      </div>
      <div>
        <el-upload
          ref="upload"
          :auto-upload="true"
          :before-upload="onBeforeUpload"
          :data="uploadData"
          :file-list="blankFiles"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          accept=".xlsx,.xls"
          action="/upload/blankExam"
          class="upload-demo"
          drag
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip"> 只能上传xls或xlsx格式!</div>
        </el-upload>
      </div>
    </div>

    <el-divider></el-divider>

    <div id="containerOne" class="container">
      <div class="content-title">上传判断题</div>
      <div class="plugins-tips">
        以指定格式上传.
        <el-link @click="downloadJudgeTemp()" style="font-size: 16px">点击此处下载格式规范.</el-link>
        只能上传xls或xlsx格式!
      </div>
      <div>
        <el-upload
          ref="upload"
          :auto-upload="true"
          :before-upload="onBeforeUpload"
          :data="uploadData"
          :file-list="judgeFiles"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          accept=".xlsx,.xls"
          action="/upload/judgeExam"
          class="upload-demo"
          drag
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip"> 只能上传xls或xlsx格式!</div>
        </el-upload>
      </div>
    </div>

    <el-divider></el-divider>

    <div id="containerOne" class="container">
      <div class="content-title">上传简答题</div>
      <div class="plugins-tips">
        以指定格式上传.
        <el-link @click="downloadEssayTemp()" style="font-size: 16px">点击此处下载格式规范.</el-link>
        只能上传xls或xlsx格式!
      </div>
      <div>
        <el-upload
          ref="upload"
          :auto-upload="true"
          :before-upload="onBeforeUpload"
          :data="uploadData"
          :file-list="essayFiles"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          accept=".xlsx,.xls"
          action="/upload/essayExam"
          class="upload-demo"
          drag
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip"> 只能上传xls或xlsx格式!</div>
        </el-upload>
      </div>
    </div>

    <!--遮罩层-->
    <div v-if="loading" class="loading">
      <h4 class="tips">{{ tips }}</h4>
      <!--进度条-->
      <el-progress :percentage="percentage" :show-text="true" class="progress" type="line"></el-progress>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'uploadTest',
  data() {
    return {
      selectFiles: [],
      blankFiles: [],
      judgeFiles: [],
      essayFiles: [],
      uploadData: [],
      loading: false,
      percentage: 0,
      tips: '',
      dialogVisible: false
    }
  },
  methods: {

    downloadSelectTemp() {
      this.axios({
        method: 'post',
        url: '/upload/selectTemp',
        responseType: 'blob'
      }).then(res => {
        const link = document.createElement('a')
        const blob = new Blob([res.data], {type: 'multipary/form-data'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', decodeURI('选择题模板.xlsx'))
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log(res)
      })
    },
    downloadBlankTemp() {
      this.axios({
        method: 'post',
        url: '/upload/blankTemp',
        responseType: 'blob'
      }).then(res => {
        const link = document.createElement('a')
        const blob = new Blob([res.data], {type: 'multipary/form-data'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', decodeURI('填空题模板.xlsx'))
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log(res)
      })
    },
    downloadJudgeTemp() {
      this.axios({
        method: 'post',
        url: '/upload/judgeTemp',
        responseType: 'blob'
      }).then(res => {
        const link = document.createElement('a')
        const blob = new Blob([res.data], {type: 'multipary/form-data'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', decodeURI('判断题模板.xlsx'))
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log(res)
      })
    },
    downloadEssayTemp() {
      this.axios({
        method: 'post',
        url: '/upload/essayTemp',
        responseType: 'blob'
      }).then(res => {
        const link = document.createElement('a')
        const blob = new Blob([res.data], {type: 'multipary/form-data'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', decodeURI('简答题模板.xlsx'))
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log(res)
      })
    },

    beforeSelectTopicUpload(file) {
      let fd = new FormData();
      fd.append('file', file);
      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100;
          this.percentage = complete;
        },
        header: {
          'ContentType-Type': 'multipart/form-data'
        }
      };
      axios.post("http://localhost:8080/teacher/selectTopicsUpload", fd, config)
        .then(response => {
          console.log(response)
          if (this.percentage >= 100) {
            if (response.data === true) {
              this.dialogVisible = true;
              this.$message.success("上传成功!");
              this.$router.push('/teacher/teacherSearchAllSelectionTest');
            } else {
              this.dialogVisible = true;
              this.$message.error("上传失败!")
            }
          }
          if (this.percentage >= 100 && response.data === true) {
            this.dialogVisible = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    submitSelectTopicUpload() {
      this.loading = true;
      this.tips = "正在上传中...";
      this.$refs.selectUpload.submit();
    },

    beforeBlankTopicUpload(file) {
      let fd = new FormData();
      fd.append('file', file);
      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100;
          this.percentage = complete;
        },
        header: {
          'ContentType-Type': 'multipart/form-data'
        }
      };
      axios.post("http://localhost:8080/teacher/blankTopicsUpload", fd, config)
        .then(response => {
          console.log(response)
          if (this.percentage >= 100) {
            if (response.data === true) {
              this.dialogVisible = true;
              this.$message.success("上传成功!");
              this.$router.push('/teacher/teacherSearchAllBlankTest');
            } else {
              this.dialogVisible = true;
              this.$message.error("上传失败!")
            }
          }
          if (this.percentage >= 100 && response.data === true) {
            this.dialogVisible = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    submitBlankTopicUpload() {
      this.loading = true;
      this.tips = '正在上传中...';
      this.$refs.blankUpload.submit();
    },

    beforeJudgeTopicUpload(file) {
      let fd = new FormData();
      fd.append('file', file);
      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100;
          this.percentage = complete;
        },
        header: {
          'ContentType-Type': 'multipart/form-data'
        }
      };
      axios.post("http://localhost:8080/teacher/judgeTopicsUpload", fd, config)
        .then(response => {
          console.log(response)
          if (this.percentage >= 100) {
            if (response.data === true) {
              this.dialogVisible = true;
              this.$message.success("上传成功!");
              this.$router.push('/teacher/teacherSearchAllJudgeTest');
            } else {
              this.dialogVisible = true;
              this.$message.error("上传失败!")
            }
          }
          if (this.percentage >= 100 && response.data === true) {
            this.dialogVisible = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    submitJudgeTopicUpload() {
      this.loading = true;
      this.tips = '正在上传中...';
      this.$refs.judgeUpload.submit();
    },

    beforeSubjectiveTopicUpload(file) {
      let fd = new FormData();
      fd.append('file', file);
      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100;
          this.percentage = complete;
        },
        header: {
          'ContentType-Type': 'multipart/form-data'
        }
      };
      axios.post("http://localhost:8080/teacher/subjectiveTopicsUpload", fd, config)
        .then(response => {
          console.log(response)
          if (this.percentage >= 100) {
            if (response.data === true) {
              this.dialogVisible = true;
              this.$message.success("上传成功!");
              this.$router.push('/teacher/teacherSearchAllDescriptionTest');
            } else {
              this.dialogVisible = true;
              this.$message.error("上传失败!")
            }
          }
          if (this.percentage >= 100 && response.data === true) {
            this.dialogVisible = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    submitSubjectiveTopicUpload() {
      this.loading = true;
      this.tips = '正在上传中...';
      this.$refs.subjectiveUpload.submit();
    }

  }
}
</script>
<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}

.plugins-tips {
  background: #eef1f6;
  padding: 20px 10px;
  margin-bottom: 20px;
}
</style>
