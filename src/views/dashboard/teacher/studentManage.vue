<template>
  <div class="context">
    <div class="crumbs" style="font-size: 22px;margin-bottom: 10px">
      用户信息管理
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          class="handle-del mr10"
          icon="el-icon-delete"
          type="primary"
          @click="delAllSelection"
        >批量删除
        </el-button>

        <el-select v-model="query.department" class="handle-select mr10" placeholder="系别">
          <el-option key="1" label="机械工程系" value="机械工程系" />
          <el-option key="2" label="信息工程系" value="信息工程系" />
          <el-option key="3" label="计算机科学与技术系" value="计算机科学与技术系" />
          <el-option key="4" label="建筑系" value="建筑系" />
          <el-option key="5" label="管理系" value="管理系" />
          <el-option key="6" label="文学与文法系" value="文学与文法系" />
          <el-option key="7" label="建筑工程系" value="建筑工程系" />
          <el-option key="8" label="化工系" value="化工系" />
          <el-option key="9" label="艺术系" value="艺术系" />
        </el-select>

        <el-select v-model="query.department" class="handle-select mr10" placeholder="专业">
          <el-option key="1" label="机械工程系" value="机械工程系" />
          <el-option key="2" label="信息工程系" value="信息工程系" />
          <el-option key="3" label="计算机科学与技术系" value="计算机科学与技术系" />
          <el-option key="4" label="建筑系" value="建筑系" />
          <el-option key="5" label="管理系" value="管理系" />
          <el-option key="6" label="文学与文法系" value="文学与文法系" />
          <el-option key="7" label="建筑工程系" value="建筑工程系" />
          <el-option key="8" label="化工系" value="化工系" />
          <el-option key="9" label="艺术系" value="艺术系" />
        </el-select>

        <el-input v-model="query.username" class="handle-input mr10" placeholder="用户名/学号" />

        <el-button icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        class="table"
        header-cell-class-name="table-header"
        @selection-change="handleSelectChange"
      >
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" label="ID" prop="userId" width="55" />
        <el-table-column align="center" label="用户名" prop="username" />
        <el-table-column align="center" label="密码" prop="password" />
        <el-table-column align="center" label="角色" prop="role" />
        <el-table-column align="center" label="学号或教师号" prop="number" />
        <el-table-column align="center" label="年级" prop="grade" />
        <el-table-column align="center" label="系别" prop="department" />
        <el-table-column align="center" label="专业" prop="major" />
        <el-table-column align="center" label="班级" prop="capAndTrade" />
        <el-table-column align="center" label="注册时间" prop="registrationt" />
        <el-table-column align="center" label="联系方式" prop="phone" />
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

    <!-- 编辑弹出框 -->
    <el-dialog :visible.sync="editVisible" title="编辑" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户id" v-text="form.userId" />
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="学教号">
          <el-input v-model="form.number" />
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="form.grade" />
        </el-form-item>
        <el-form-item label="系别">
          <el-input v-model="form.department" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.major" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.capAndTrade" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManege',
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      query: {
        userId: '',
        username: '',
        password: '',
        department: '',
        major: '',
        number: '',
        grade: ''

      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  created() {
    this.getData()
  },
  activated() {
    this.getData()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getData() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/teacher/searchAllUsers',
        params: {
          cap: window.sessionStorage.getItem('cap'),
          grade: window.sessionStorage.getItem('grade'),
          major: window.sessionStorage.getItem('major')
        }
      }).then(response => {
        this.tableData = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleSearch() {
      if (this.query.department === '' && this.query.username === '') {
        this.$message.warning('请输入查询条件')
      } else if (this.query.department !== '' && this.query.username === '') {
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/admin/searchUsersByDepartment',
          data: {
            department: this.query.department
          }
        }).then(response => {
          this.tableData = response.data
        }).catch(err => {
          console.log(err)
        })
      } else if (this.query.department === '' && this.query.username !== '') {
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/admin/searchSingleStudent',
          data: {
            username: this.query.username
          }
        }).then(response => {
          console.log(response)
          this.tableData = response.data
        }).catch(err => {
          console.log(err)
        })
      } else if (this.query.username !== '' && this.query.department !== '') {
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/admin/searchUsersByDepartmentAndUsername',
          data: {
            department: this.query.department,
            username: this.query.username
          }
        }).then(response => {
          this.tableData = response.data
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleDelete(index) {
      this.$confirm('确认要删除么?', '提示', {
        type: 'warning'
      }).then(() => {
        const userID = this.tableData[index].userId
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/admin/deleteSingleUserByUserId',
          params: {
            userId: userID
          }
        }).then(response => {
          if (response.data === true) {
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
    handleSelectChange(val) {
      this.multipleSelection = val
    },
    delAllSelection() {
      if (this.multipleSelection === '') {
        this.$message.warning('请选择您要删除的条目!')
      } else {
        const length = this.multipleSelection.length
        const delArr = []
        for (let i = 0; i < length; i++) {
          delArr.push(this.multipleSelection[i].userId)
        }
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/admin/deleteAllSelectionUsers',
          data: {
            list: delArr
          }
        }).then(response => {
          if (response.data === true) {
            this.$message.success(`删除成功!`)
            this.multipleSelection = []
            this.$router.go(0)
          } else {
            // this.$message.error(`删除失败`)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleEdit(index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    saveEdit() {
      this.editVisible = false
      this.$message.success(`修改第${this.idx + 1}行成功`)
      this.$set(this.tableData, this.idx, this.form)
    },
    handlePageChange(val) {
      this.$set(this.tableData, 'pageIndex', val)
      this.getData(val)
    },
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
