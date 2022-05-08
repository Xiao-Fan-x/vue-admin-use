<template>
  <div>
    <div id="containerOne" class="container">
      <div class="content-title">上传选择题</div>
      <div class="plugins-tips">
        以指定格式上传.
        <a href="../../../assets/data/用户信息示例.xlsx" target="_blank">从此处查看格式规范.</a>
        只能上传xls或xlsx格式!
      </div>
      <el-upload
        ref="selectUpload"
        :auto-upload="false"
        :before-upload="beforeSelectTopicUpload"
        :limit="1"
        accept=".xlsx, .xls"
        action=""
        class="upload-demo"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处,或<em>点击选择文件</em></div>
      </el-upload>
      <el-button size="big" type="success" @click="submitSelectTopicUpload">点击上传</el-button>
    </div>

    <el-divider></el-divider>


    <div id="containerTwo" class="container">
      <div class="content-title">上传填空题</div>
      <div class="plugins-tips">
        以指定格式上传.
        <a href="../../../assets/data/用户信息示例.xlsx" target="_blank">从此处查看格式规范.</a>
        只能上传xls或xlsx格式!
      </div>
      <el-upload
        ref="blankUpload"
        :auto-upload="false"
        :before-upload="beforeBlankTopicUpload"
        :limit="1"
        accept=".xlsx, .xls"
        action=""
        class="upload-demo"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处,或<em>点击选择文件</em></div>
      </el-upload>
      <el-button size="big" type="success" @click="submitBlankTopicUpload">点击上传</el-button>
    </div>
    <el-divider></el-divider>

    <div id="containerThree" class="container">
      <div class="content-title">上传判断题</div>
      <div class="plugins-tips">
        以指定格式上传.
        <a href="../../../assets/data/用户信息示例.xlsx" target="_blank">从此处查看格式规范.</a>
        只能上传xls或xlsx格式!
      </div>
      <el-upload
        ref="judgeUpload"
        :auto-upload="false"
        :before-upload="beforeJudgeTopicUpload"
        :limit="1"
        accept=".xlsx, .xls"
        action=""
        class="upload-demo"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处,或<em>点击选择文件</em></div>
      </el-upload>
      <el-button size="big" type="success" @click="submitJudgeTopicUpload">点击上传</el-button>
    </div>

    <el-divider></el-divider>
    <div id="containerFour" class="container">
      <div class="content-title">上传主观题</div>
      <div class="plugins-tips">
        以指定格式上传.
        <a href="../../../assets/data/用户信息示例.xlsx" target="_blank">从此处查看格式规范.</a>
        只能上传xls或xlsx格式!
      </div>
      <el-upload
        ref="subjectiveUpload"
        :auto-upload="false"
        :before-upload="beforeSubjectiveTopicUpload"
        :limit="1"
        accept=".xlsx, .xls"
        action=""
        class="upload-demo"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处,或<em>点击选择文件</em></div>
      </el-upload>
      <el-button size="big" type="success" @click="submitSubjectiveTopicUpload">点击上传</el-button>
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
      loading: false,
      percentage: 0,
      tips: '',
      dialogVisible: false
    }
  },
  methods: {
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
