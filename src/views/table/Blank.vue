<template>
  <div class="container">
    <div class="handle-box">

      <el-select v-model="this.department" class="handle-select mr10" placeholder="请选择系别">
        <el-option v-for="(item,index) in this.search" :key="index" :label="item.department"
                   :value="item.department"></el-option>
      </el-select>

      <el-select v-model="this.major" class="handle-select mr10" placeholder="请选择专业">
        <el-option v-for="(item,index) in this.getMajor" :key="index" :label="item.major"
                   :value="item.major"></el-option>
      </el-select>

      <el-select v-model="this.subject" class="handle-select mr10" placeholder="请选择学科">
        <el-option v-for="(item,index) in this.getMajor" :key="index" :label="item.subject"
                   :value="item.subject"></el-option>
      </el-select>

      <el-button icon="el-icon-search" type="primary" @click="searchlist()">搜索</el-button>
    </div>

    <div class="container">
      <el-table
        :data="blankList"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column align="left" label="题目" prop="detail"></el-table-column>
        <el-table-column align="left" label="答案" prop="answer"></el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              class="red"
              icon="el-icon-delete"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 编辑弹出框 -->
      <el-dialog :visible.sync="editVisible" title="编辑" width="30%">
        <el-form ref="form" :model="form" label-width="70px">

          <el-form-item label="题目">
            <el-input v-model="form.detail"/>
          </el-form-item>
          <el-form-item label="答案">
            <el-input v-model="form.answer"/>
          </el-form-item>
          <el-form-item label="系">
            <el-input v-model="form.department"/>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.major"/>
          </el-form-item>
          <el-form-item label="学科">
            <el-input v-model="form.subject"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
      </el-dialog>
    </div>
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
import {mapGetters} from 'vuex'

export default {
  name: 'Blank',
  data() {
    return {
      search: [],
      total: 1,
      pageNum: 1,
      department: '',
      major: '',
      subject: '',
      blankList: [],
      editVisible: false,
      form: {},
      idx: ''
    }
  },
  methods: {
    // goback() {
    //   this.$router.back()
    // },
    handleEdit(index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    saveEdit() {
      this.editVisible = false
      this.axios({
        method: 'put',
        url: 'teacher/blank/update',
        data: {
          ...this.form
        }
      })
      this.$message.success(`修改第${this.idx + 1}行成功`)
      this.$set(this.blankList, this.idx, this.form)
    },
    handleDelete(index) {
      this.$confirm('确认要删除么?', '提示', {
        type: 'warning'
      }).then(() => {
        const id = this.blankList[index].id
        this.axios({
          method: 'delete',
          url: '/teacher/blank/' + id,
          params: {}
        }).then(response => {
          if (response.data === true) {
            this.$message.success('删除成功')
            this.searchlist()
          } else {
            this.$message.warning('删除失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
      })
    },
    // 主动搜索
    searchlist() {
      this.axios({
        method: 'post',
        url: '/teacher/blank',
        data: {
          department: this.department,
          major: this.major,
          subject: this.subject,
          page: 1
        }
      }).then(res => {
        console.log(res)
        this.pageNum = 1
        this.blankList = res.data.data.list
        this.total = res.data.data.total
      }).then(err => {
        console.log(err)
      })
    },
    // 分页跳转
    changePage(val) {
      this.axios({
        method: 'post',
        url: 'teacher/blank',
        data: {
          department: this.department,
          major: this.major,
          subject: this.subject,
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
    // 系 -》 专业 -》 学科
    getMajor() {
      if (this.department != '') {
        return this.search.filter(function (e) {
          return e.department == this.department
        })
      } else {
        return this.search
      }
    },
    getSubject() {
      if (this.department != '') {
        return this.search.filter(function (e) {
          return e.major == this.major
        })
      } else {
        return this.search
      }
    },
    // 获取学校信息
    getSchoolList() {
      this.axios({
        method: 'get',
        url: '/clasz',
        data: {}
      }).then(res => {
        console.log(res)
        this.search = res.data.data
        console.log('获取学校信息')
      }).then(err => {
        console.log('获取学校信息失败！！！')
      })
    }
  },
  created() {
    this.getSchoolList()
    this.searchlist()
  },
  computed: {
    ...mapGetters([
      'userId',
      'department',
      'major',
      'className',
      'grade'
    ])
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.mr10 {
  margin-right: 10px;
}

.handle-select {
  width: 120px;
}
</style>
