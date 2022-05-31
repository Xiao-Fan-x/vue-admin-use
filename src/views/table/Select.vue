<template>
  <div class="container">
    <div class="handle-box">

      <el-select v-model="this.department" class="handle-select mr10" placeholder="请选择系别">
        <el-option v-for="(item,index) in this.getMajor" :key="index" :label="item"
                   :value="item.grade"></el-option>
      </el-select>

      <el-select v-model="this.major" class="handle-select mr10" placeholder="请选择专业">
        <el-option v-for="(item,index) in this.getMajor" :key="index" :label="item"
                   :value="item"></el-option>
      </el-select>

      <el-select v-model="this.subject" class="handle-select mr10" placeholder="请选择学科">
        <el-option v-for="(item,index) in this.getMajor" :key="index" :label="item"
                   :value="item"></el-option>
      </el-select>

      <el-button icon="el-icon-search" type="primary" @click="searchlist()">搜索</el-button>
    </div>

    <div class="container">
      <el-table
        :data="selectList"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column align="center" label="题目" prop="detail"></el-table-column>
        <el-table-column align="center" label="A" prop="pointA"></el-table-column>
        <el-table-column align="center" label="B" prop="pointB"></el-table-column>
        <el-table-column align="center" label="C" prop="pointC"></el-table-column>
        <el-table-column align="center" label="D" prop="pointD"></el-table-column>
        <el-table-column align="center" label="答案" prop="answer"></el-table-column>
      </el-table>
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
  name: 'Select',
  data() {
    return {
      search: [],
      total: 1,
      pageNum: 1,
      department: '',
      major: '',
      subject: '',
      selectList: [],
    }
  },
  methods: {
    // goback() {
    //   this.$router.back()
    // },
    // 主动搜索
    searchlist() {
      this.axios({
        method: 'post',
        url: '/teacher/select',
        data: {
          department: this.department,
          major: this.major,
          subject: this.subject,
          page: 1
        }
      }).then(res => {
        console.log(res)
        this.pageNum = 1
        this.selectList = res.data.data.list
        this.total = res.data.data.total
      }).then(err => {
        console.log(err)
      })
    },
    // 分页跳转
    changePage(val) {
      this.axios({
        method: 'post',
        url: 'teacher/select',
        data: {
          department: this.department,
          major: this.major,
          subject: this.subject,
          page: val
        }
      }).then(res => {
        this.pageNum = val
        this.selectList = res.data.data.list
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
