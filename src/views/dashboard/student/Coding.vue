<template>
  <div>
    <h1>编程测试
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :disabled="item.disabled"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="runningCode">运行</el-button>
    </h1>
    <div class="container">
      <div class="exam-card">
        <div class="card-content">
          <el-card class="box-card">
            <!-- 编程 -->
            <div>
              给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
              <br>
              <br>
              示例 1:
              <br>
              输入: s = "abcabcbb" <br>
              输出: 3 <br>
              解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。<br>
              示例 2:<br>
              输入: s = "bbbbb"<br>
              输出: 1<br>
              解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。<br>
              示例 3:<br>
              输入: s = "pwwkew"<br>
              输出: 3<br>
              解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。<br>
                请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。<br>
            </div>

            <div style="margin-top: 30px;">
              <el-input
                v-model="textarea"
                :rows="this.row"
                autocomplete="on"
                placeholder="请输入内容"
                type="textarea"
              >
              </el-input>
            </div>
            <div v-show="show" style="margin-top: 30px;">
              <el-input
                v-model="result"
                :rows="this.row"
                autocomplete="on"
                placeholder="请输入内容"
                type="textarea"
              >
              </el-input>
            </div>

          </el-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Coding',
  data() {
    return {
      show: false,
      question: '',
      reply: '',
      result: '',
      textarea: '',
      row: '32',
      options: [{
        value: 'C++',
        label: 'C++',
        disabled: 'true'
      }, {
        value: 'Python',
        label: 'Python'
      }, {
        value: 'Java',
        label: 'Java'
      }],
      value: ''
    }
  },
  methods: {
    getCodeQues() {
      this.axios({
        method: 'get',
        // url: '/examStudent/getExam/' + 22053111
        url: '/examStudent/getExam/' + this.$route.params.examId
      }).then(res => {
        console.log(res)
        this.selectList = res.data.data.select
        this.blankList = res.data.data.blank
        this.judgeList = res.data.data.judge
        this.essayList = res.data.data.essay
      })
    },
    runningCode() {
      this.row = 20
      this.show = true
      this.axios({
        method: 'post',
        url: '/coding/running',
        data: {
          language: this.value,
          code: this.textarea
        }
      }).then(res => {
        console.log(res)
        this.result = res.data.data
      }).then(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getCodeQues()
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
  min-height: 800px;
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
