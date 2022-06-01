<template>
  <div class="context">
    <div class="container">
      <div class="handle-box">

        <el-select v-model="examOption.department" class="handle-select mr10" clearable placeholder="请选择系别">
          <el-option v-for="(item,index) in classInfor" :key="index" :label="item.department"
                     :value="item.department"></el-option>
        </el-select>
        <el-select v-model="examOption.major" class="handle-select mr10" clearable placeholder="请选择专业">
          <el-option v-for="(item,index) in classInfor" :key="index" :label="item.major"
                     :value="item.major"></el-option>
        </el-select>
        <el-select v-model="examOption.subject" class="handle-select mr10" clearable placeholder="请选择学科">
          <el-option v-for="(item,index) in classInfor" :key="index" :label="item.subject"
                     :value="item.subject"></el-option>
        </el-select>

        <el-input v-model="examOption.userName" class="handle-input mr10" placeholder="关键词"/>
        <el-button icon="el-icon-search" type="primary" @click="getData">搜索</el-button>
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        class="table"
        header-cell-class-name="table-header"
        @selection-change="handleSelectChange"
      >
        <el-table-column align="left" label="题目" prop="detail" width="500" :show-overflow-tooltip="true"/>
        <el-table-column align="left" label="第一点" prop="pointOne" :show-overflow-tooltip="true"/>
        <el-table-column align="left" label="第二点" prop="pointTwo" :show-overflow-tooltip="true"/>
        <el-table-column align="center" label="系别" prop="department" />
        <el-table-column align="center" label="专业" prop="major"/>
        <el-table-column align="center" label="解析" prop="analysis"/>

        <!--        <el-table-column align="center" label="操作" width="180">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button-->
        <!--              icon="el-icon-edit"-->
        <!--              type="text"-->
        <!--              @click="handleEdit(scope.$index, scope.row)"-->
        <!--            >编辑-->
        <!--            </el-button>-->
        <!--            <el-button-->
        <!--              class="red"-->
        <!--              icon="el-icon-delete"-->
        <!--              type="text"-->
        <!--              @click="handleDelete(scope.$index, scope.row)"-->
        <!--            >删除-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <!--    <el-dialog :visible.sync="editVisible" title="编辑" width="30%">-->
    <!--      <el-form ref="form" :model="form" label-width="70px">-->
    <!--        &lt;!&ndash;        <el-form-item label="学号" v-text="form.userId"/>&ndash;&gt;-->
    <!--        <el-form-item label="用户名">-->
    <!--          <el-input v-model="form.userName"/>-->
    <!--        </el-form-item>-->
    <!--        &lt;!&ndash;        <el-form-item label="密码">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <el-input v-model="form.password"/>&ndash;&gt;-->
    <!--        &lt;!&ndash;        </el-form-item>&ndash;&gt;-->
    <!--        <el-form-item label="学号">-->
    <!--          <el-input v-model="form.userId"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="年级">-->
    <!--          <el-input v-model="form.grade"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="系别">-->
    <!--          <el-input v-model="form.department"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="专业">-->
    <!--          <el-input v-model="form.major"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="班级">-->
    <!--          <el-input v-model="form.className"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="联系方式">-->
    <!--          <el-input v-model="form.phone"/>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--        <el-button @click="editVisible = false">取 消</el-button>-->
    <!--        <el-button type="primary" @click="saveEdit">确 定</el-button>-->
    <!--      </span>-->
    <!--    </el-dialog>-->
    <!--分页-->
    <div class="block" style="text-align: center">
      <el-pagination
        :current-page="pageNum"
        :page-size="10"
        :total="this.total"
        layout="prev, pager, next"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Essay',
  data() {
    return {
      classInfor: [],
      examOption: {
        userName: '',
        name: '',
        date: [],
        grade: '',
        major: '',
        subject: '',
        department: '',
        className: '',
        elective: ''
      },
      tableData: [],
      total: 1,
      pageNum: 1,
      editVisible: false,

      multipleSelection: [],
      delList: [],

      form: {},
      idx: -1,
    }
  },
  created() {
    this.getData()
    this.getClassInfor()
  },

  methods: {
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
    // 获取学生列表
    getData() {
      this.axios({
        method: 'post',
        url: '/teacher/essay',
        data: {
          department: this.examOption.department,
          major: this.examOption.major,
          subject: this.examOption.subject,
          detail: this.examOption.detail,
          page: 1
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    handleDelete(index) {
      this.$confirm('确认要删除么?', '提示', {
        type: 'warning'
      }).then(() => {
        const userId = this.tableData[index].userId
        this.axios({
          method: 'delete',
          url: 'studentManager/student/' + userId
        }).then(response => {
          if (response.data.msg == 'sucessed') {
            this.$message.success('删除成功')
            this.tableData.splice(index, 1)
          } else {
            this.$message.warning('删除失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
      })
    },
    saveEdit() {
      this.editVisible = false
      this.axios({
        method: 'put',
        url: '/studentManager/student/update',
        data: {
          ...this.form
        }
      })
      this.$message.success(`修改第${this.idx + 1}行成功`)
      this.$set(this.tableData, this.idx, this.form)
    },
    // 分页跳转
    changePage(val) {
      this.axios({
        method: 'post',
        url: '/studentManager/search',
        data: {
          grade: this.examOption.grade,
          department: this.examOption.department,
          major: this.examOption.major,
          className: this.examOption.className,
          userName: this.examOption.userName,
          page: val
        }
      }).then(res => {
        this.pageNum = val
        this.blankList = res.data.data.list
        this.total = res.data.data.total
      }).then(err => {
        console.log(err)
      })
    },

    handleSelectChange(val) {
      this.multipleSelection = val
    },

    // handlePageChange(val) {
    //   this.$set(this.tableData, 'pageIndex', val)
    //   this.getData(val)
    // },
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

</style>
