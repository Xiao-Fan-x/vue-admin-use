<template>
  <!--  <div>-->
  <!--    {{this.$route.params.userId}}-->
  <!--  </div>-->
  <div>
    <h1>hello</h1>
    <div class="container">
      <div class="exam-card">
        <div class="card-content">
          <el-card class="box-card">
            <!-- 选择题 -->
            <div v-for="(item, index) in selectTopicsList" :key="index" class="q-single">
              <br>
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆; font-size: 17px">第{{ item.topicId }}题 ({{ item.topicType }}):</span>
              </div>
              <div class="question" style="font-family: 幼圆; font-size: 18px">
                {{ item.detail }}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-radio-group v-model="clientSelectAnswer[index]" style="font-family: 幼圆; font-size: 17px">
                    <el-radio label="A">{{ item.optionA }}</el-radio>
                    <el-radio label="B">{{ item.optionB }}</el-radio>
                    <el-radio label="C">{{ item.optionC }}</el-radio>
                    <el-radio label="D">{{ item.optionD }}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <!-- 填空 -->
            <div v-for="(item, index) in blankTopicsList" :key="item.topicId" class="q-fill-in">
              <br>
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆; font-size: 17px">第{{ item.topicId }}题 ({{ item.topicType }}):</span>
              </div>
              <div class="question" style="font-family: 幼圆; font-size: 18px">
                {{ item.detail }}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-input
                    v-model="clientBlankAnswer[index]"
                    :rows="2"
                    placeholder="请输入答案"
                    style="font-size: 17px; font-family: 幼圆"
                    type="textarea"
                  >
                  </el-input>
                </div>
              </div>
            </div>

            <!-- 判断 -->
            <div v-for="(item, index) in judgeTopicsList" :key="item.topicId" class="q-true-or-false">
              <br>
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆; font-size: 17px">第{{ item.topicId }}题 ({{ item.topicType }}):</span>
              </div>
              <div class="question" style="font-family: 幼圆; font-size: 18px">
                {{ item.detail }}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-radio-group v-model="clientJudgeAnswer[index]" style="font-family: 幼圆; font-size: 17px">
                    <el-radio label="1">正确</el-radio>
                    <el-radio label="0">错误</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>

            <!-- 简答 -->
            <div v-for="(item, index) in subjectiveList" :key="item.topicId" class="q-short-answer">
              <br>
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆; font-size: 17px">第{{ item.topicId }}题 ({{ item.topicType }}):</span>
              </div>
              <div class="question" style="font-family: 幼圆; font-size: 18px">
                {{ item.detail }}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-input
                    v-model="clientSubjectiveAnswer[index]"
                    :rows="5"
                    placeholder="请输入答案"
                    style="font-size: 17px; font-family: 幼圆"
                    type="textarea"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="submit-paper f-r">
      <el-button round type="primary" @click="submitPaper">交卷</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "startExam",

  methods: {
    startExam() {
      this.axios({
        method: 'get',
        url: ''
      })
    }
  },
  created() {

  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.card-header {
  padding: 10px;
  font-size: 20px;
  /*margin-top: 10px*/
}

.answer-card {
  cursor: pointer;
}

.time, .answer-card {
  margin-top: 10px;
}

.answer-item {
  padding: 10px;
}

.question {
  padding: 10px 0;
}

.card-content {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
}

.card-content .box-card {
  min-height: 500px;
}

.el-button.stu-answer-item {
  margin: 10px;
  width: 60px;
  height: 60px
}

.f-r {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.f-l {
  float: left;
}

.m-l-20 {
  margin-left: 20px;
}

.m-r-20 {
  margin-right: 20px;
}

.m-t-20 {
  margin-top: 20px;
}

.m-b-20 {
  margin-bottom: 20px;
}

.bold {
  font-weight: bold;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}

.ta-c {
  text-align: center;
}
</style>
