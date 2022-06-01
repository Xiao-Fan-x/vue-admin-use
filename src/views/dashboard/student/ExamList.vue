<template>
  <div class="context">
    <div class="crumbs" style="font-size: 22px;margin-bottom: 10px">
      考核列表
      <el-button class="handle-del mr10" icon="el-icon-plus" type="primary" @click="getExamList">
        刷新
      </el-button>
    </div>

    <div class="container">
      <el-table
        :data="examList"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column align="center" label="测试名称" prop="examName"></el-table-column>
        <el-table-column align="center" label="开始时间" prop="startTime"></el-table-column>
        <el-table-column align="center" label="结束时间" prop="endTime"></el-table-column>
        <el-table-column align="center" label="操作" width="240">
          <template slot-scope="scope">
            <!--            <el-button-->
            <!--              class="red"-->
            <!--              icon="el-icon-delete"-->
            <!--              type="text"-->
            <!--              @click="selectQuestion(scope.$index, scope.row)"-->
            <!--            >选题-->
            <!--            </el-button>-->
            <el-button
              class="red2"
              icon="el-icon-monitor"
              type="text"
              @click="send(scope.$index, scope.row)"
            >开始
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ExamList",
  data() {
    return {
      // 展示列表
      examList: [],
      classInfor: [],
      examOption: {
        name: '',
        date: [],
        grade: '',
        major: '',
        subject: '',
        department: '',
        className: '',
        elective: ''
      },
      // 选题
      examType: 'blank',
      exam: {
        grade: '',
        major: '',
        subject: '',
        className: '',
        elective: '',
        department: ''
      },
      // 选题列表
      examData: {
        select: [],
        blank: [],
        judge: [],
        essay: []
      },
      // 已选list
      selectExam: {
        id: '',
        select: [],
        blank: [],
        judge: [],
        essay: []
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'department',
      'major',
      'className',
      'grade'
    ])
  },
  methods: {
    handleSelectionChangeSelect(val) {
      console.log(val)
      this.selectExam.select.add(val)
    },
    handleSelectionChangeBlank(val) {
      this.multipleSelection = val
    },
    handleSelectionChangeJudge(val) {
      this.multipleSelection = val
    },
    handleSelectionChangeEssay(val) {
      this.multipleSelection = val
    },
    send(index, row) {
      console.log(row.examId)
      this.$router.push({name: 'examPage', params: {examId: row.examId}})
    },

    // 获取创建过的测试
    getExamList() {
      this.axios({
        method: 'get',
        url: '/examStudent/all/' + this.userId,
        data: {}
      }).then(res => {
        console.log(res)
        this.examList = res.data.data
      }).then(err => {
        console.log(err)
      })
    },
    // 获取学校班级信息
    getClassInfor() {
      this.axios({
        method: 'get',
        url: '/clasz',
        // data: {}
      }).then(res => {
        console.log(res)
        this.classInfor = res.data.data
      }).then(err => {
        console.log(err)
      })
    },
    // 过滤 系
    getMajor() {
      if (this.examOption.department != '') {
        return this.classInfor.filter(function (e) {
          return e.department == this.department
        })
      } else {
        return this.classInfor
      }
    },
    // 过滤 专业
    getSubject() {
      if (this.examOption.major != '') {
        return this.classInfor.filter(function (e) {
          return e.major == this.major
        })
      } else {
        return this.classInfor
      }
    },
  },
  created() {
    this.getExamList()
    this.getClassInfor()
  },
}

</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
</style>
