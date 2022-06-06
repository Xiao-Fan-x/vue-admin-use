<template>
  <div>
    <h1>考核</h1>
    <div class="container">
      <div class="exam-card">
        <div class="card-content">
          <el-card class="box-card">
            <!-- 选择题 -->
            <div v-for="(item, index) in selectList" :key="index" class="q-single">
              <br>
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆; font-size: 17px">选择题 第({{ index + 1 }})题:</span>
              </div>
              <div class="question" style="font-family: 幼圆; font-size: 18px">
                {{ item.detail }}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-radio-group v-model="selectAnswer[index]" style="font-family: 幼圆; font-size: 17px">
                    <el-radio label="A">{{ item.pointA }}</el-radio>
                    <el-radio label="B">{{ item.pointB }}</el-radio>
                    <el-radio label="C">{{ item.pointC }}</el-radio>
                    <el-radio label="D">{{ item.pointD }}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <!-- 填空 -->
            <div v-for="(item, index) in blankList" :key="index" class="q-fill-in">
              <br>
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆; font-size: 17px">填空题 第({{ index + 1 }})题:</span>
              </div>
              <div class="question" style="font-family: 幼圆; font-size: 18px">
                {{ item.detail }}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-input
                    v-model="blankAnswer[index]"
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
            <div v-for="(item, index) in judgeList" :key="item.topicId" class="q-true-or-false">
              <br>
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆; font-size: 17px">判断题 第({{ index + 1 }})题:</span>
              </div>
              <div class="question" style="font-family: 幼圆; font-size: 18px">
                {{ item.detail }}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-radio-group v-model="judgeAnswer[index]" style="font-family: 幼圆; font-size: 17px">
                    <el-radio label="right">正确</el-radio>
                    <el-radio label="wrong">错误</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>

            <!-- 简答 -->
            <div v-for="(item, index) in essayList" :key="item.topicId" class="q-short-answer">
              <br>
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆; font-size: 17px">简答题 第({{ index + 1 }})题:</span>
              </div>
              <div class="question" style="font-family: 幼圆; font-size: 18px">
                {{ item.detail }}
              </div>
              <div class="answer">
                <div class="answer-item">
                  <el-input
                    v-model="essayAnswer[index]"
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
      <el-button round type="primary" @click="endExam">交卷</el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "startExam",
  data() {
    return {
      selectList: [],
      blankList: [],
      judgeList: [],
      essayList: [],
      selectAnswer: [],
      blankAnswer: [],
      judgeAnswer: [],
      essayAnswer: []
    }
  },
  methods: {
    startExam() {
      this.axios({
        method: 'get',
        headers: {
          token: this.$store.getters.token
        },
        url: '/examStudent/getExam/' + this.$route.params.examId
      }).then(res => {
        console.log(res)
        this.selectList = res.data.data.select
        this.blankList = res.data.data.blank
        this.judgeList = res.data.data.judge
        this.essayList = res.data.data.essay
      })
    },
    endExam() {
      this.axios({
        method: 'post',
        url: '/examStudent/endExam',
        data: {
          userId: this.userId,
          examId: this.$route.params.examId,
          selectAnswer: this.selectAnswer,
          blankAnswer: this.blankAnswer,
          judgeAnswer: this.judgeAnswer,
          essayAnswer: this.essayAnswer
        }
      }).then(res => {
        if (res.data.code == '200') {
          this.$message.info('交卷成功！')
          this.$router.replace('/exam')
        }
      }).then(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.startExam()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
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
