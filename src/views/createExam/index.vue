<template>
  <div class="context">
    <div class="crumbs" style="font-size: 22px;margin-bottom: 10px">
      创建测试
    </div>
    <div class="container">
      <div>
        <el-button class="handle-del mr10" icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">
          创建测试
        </el-button>
        <el-button class="handle-del mr10" icon="el-icon-plus" type="primary" @click="getExamList">
          刷新
        </el-button>

        <el-dialog :visible.sync="dialogFormVisible" title="创建测试">
          <el-form :model="examOption">
            <el-form-item :label-width="formLabelWidth" label="考核名称">
              <el-input v-model="examOption.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="考核时间">
              <el-date-picker
                v-model="examOption.date"
                :default-time="['12:00:00']"
                end-placeholder="结束日期"
                start-placeholder="开始日期"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
            <!--  年级-->
            <el-form-item :label-width="formLabelWidth" label="年级">
              <el-select v-model="examOption.grade" placeholder="请选择年级" clearable>
                <el-option v-for="(item,index) in classInfor" :key="index" :label="item.grade"
                           :value="item.grade"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="系">
              <el-select v-model="examOption.department" placeholder="请选择系" clearable>
                <el-option v-for="(item,index) in classInfor" :key="index" :label="item.department"
                           :value="item.department"></el-option>
              </el-select>
            </el-form-item>
            <!---->
            <el-form-item :label-width="formLabelWidth" label="专业">
              <el-select v-model="examOption.major" placeholder="请选择专业" clearable>
                <el-option v-for="(item,index) in classInfor" :key="index" :label="item.major"
                           :value="item.major"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="学科">
              <el-select v-model="examOption.subject" placeholder="请选择学科" clearable>
                <el-option v-for="(item,index) in classInfor" :key="index" :label="item"
                           :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="班级">
              <el-select v-model="examOption.className" placeholder="请选择班级" clearable>
                <el-option v-for="(item,index) in classInfor" :key="index" :label="item"
                           :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="选修课">
              <el-select v-model="examOption.elective" placeholder="请选择选修课" clearable>
                <el-option v-for="(item,index) in classInfor" :key="index" :label="item"
                           :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="createExam">确 定</el-button>
          </div>
        </el-dialog>
      </div>

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
            <el-button
              class="red"
              icon="el-icon-delete"
              type="text"
              @click="selectQuestion(scope.$index, scope.row)"
            >选题
            </el-button>
            <el-button
              class="red2"
              icon="el-icon-monitor"
              type="text"
              @click="send(scope.$index, scope.row)"
            >发布
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--    选择题目-->
    <el-dialog :visible.sync="dialogTableVisible" title="创建测试">

      <div>
        <el-select v-model="selectExam.select" multiple placeholder="选择题" style="width: 100% ;padding-bottom: 20px">
          <el-option
            v-for="item in examData.select"
            :key="item.id"
            :label="item.detail"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="selectExam.blank" multiple placeholder="填空题" style="width: 100%;padding-bottom: 20px">
          <el-option
            v-for="item in examData.blank"
            :key="item.id"
            :label="item.detail"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="selectExam.judge" multiple placeholder="判断题" style="width: 100%;padding-bottom: 20px">
          <el-option
            v-for="item in examData.judge"
            :key="item.id"
            :label="item.detail"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="selectExam.essay" multiple placeholder="简答题" style="width: 100%;padding-bottom: 20px">
          <el-option
            v-for="item in examData.essay"
            :key="item.id"
            :label="item.detail"
            :value="item.id">
          </el-option>
        </el-select>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectQues">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "index",
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
      this.axios({
        method: 'get',
        url: 'examTeacher/send/' + row.id
      })
    },
    selectQuestion(index, row) {
      this.axios({
        method: 'get',
        url: '/examTeacher/selectQuestion/' + row.id
      }).then(res => {
        console.log(res)
        this.examData.select = res.data.data.select
        this.examData.blank = res.data.data.blank
        this.examData.judge = res.data.data.judge
        this.examData.essay = res.data.data.essay
      }).then(err => {
        console.log(err)
      })
      // this.examType = ''
      this.selectExam.id = row.id
      this.dialogTableVisible = true
    },

    selectQues() {
      this.dialogTableVisible = false
      this.axios({
        method: 'post',
        url: '/examTeacher/determine',
        data: {
          id: this.selectExam.id,
          select: this.selectExam.select,
          blank: this.selectExam.blank,
          judge: this.selectExam.judge,
          essay: this.selectExam.essay
        }
      }).then(res => {
        console.log('选题成功')
      }).then(err => {
        console.log('选题失败')
      })
    },
    // 获取创建过的测试
    getExamList() {
      this.axios({
        method: 'get',
        url: '/examTeacher/' + this.userId,
        data: {}
      }).then(res => {
        // console.log(res)
        this.examList = res.data.data.self
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
    createExam() {
      this.dialogFormVisible = false
      this.axios({
        method: 'post',
        url: '/examTeacher/create',
        data: {
          examName: this.examOption.name,
          createPeople: this.userId,
          startTime: this.examOption.date[0],
          endTime: this.examOption.date[1],
          grade: this.examOption.grade,
          department: this.examOption.department,
          major: this.examOption.major,
          subject: this.examOption.subject,
          className: this.examOption.className,
          elective: this.examOption.elective,
        }
      }).then(res => {
        this.classInfor = res.data.list
      }).then(err => {
        console.log(err)
      })
    },
  },
  created() {
    this.getExamList()
    this.getClassInfor()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
}

</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
</style>
