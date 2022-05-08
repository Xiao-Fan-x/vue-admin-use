<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="mgb20" shadow="hover" style="height:250px;">
          <div class="user-info">
            <img alt class="user-avator" src="../../../assets/img.jpg">
            <div class="user-info-cont">
              <div class="user-info-name">{{ $store.getters.userName }}</div>
              <div>{{ $store.getters.userId }}</div>
            </div>
          </div>
        </el-card>

<!--        echarts-->
        <el-card
          shadow="hover"
          style="height:300px;
                  text-align: center;
                  display: flex;
                  justify-content: center;"
        >
          <div
            id="pic123"
            style="width: 400px;height: 300px;text-align: center;
          display: flex;
          justify-content: center;"
          />
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card :body-style="{padding: '0px'}" shadow="hover">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon" />
                <div class="grid-cont-right">
                  <div class="grid-num">{{student}}</div>
                  <div>用户数</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card :body-style="{padding: '0px'}" shadow="hover">
              <div class="grid-content grid-con-2">
                <i class="el-icon-notebook-1 grid-con-icon" />
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>总题量</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card :body-style="{padding: '0px'}" shadow="hover">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-people grid-con-icon" />
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-card shadow="hover" style="height:450px;">
          <div slot="header" class="clearfix">
            <span>考试</span>
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>
<!--          table-->
          <el-table
            :data="todoList"
            border
            height="400"
            stripe
            style="width: 100%"
          >
            <el-table-column
              label="开始时间日期"
              prop="title"
              width="180px"
            />
            <el-table-column
              label="姓名"
              prop="status"
              width="180"
            />
            <el-table-column
              label="地址"
              prop="address"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'TeacherDashboard',
  data() {
    return {
      // activeNames: ['3', '2', '4'],
      chart: null,
      TestNumber: {
        select: '',
        judge: '',
        blank: '',
        subject: ''
      },
      todoList: [
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: false
        }
        // },
        // {
        //   title: '今天要修复100个bug',
        //   status: false
        // },
        // {
        //   title: '今天要修复100个bug',
        //   status: true
        // },
        // {
        //   title: '今天要写100行代码加几个bug吧',
        //   status: true
        // },
        // {
        //   title: '今天要写100行代码加几个bug吧',
        //   status: false
        // },
        // {
        //   title: '今天要修复100个bug',
        //   status: false
        // },
        // {
        //   title: '今天要修复100个bug',
        //   status: true
        // },
        // {
        //   title: '今天要写100行代码加几个bug吧',
        //   status: true
        // }
      ],

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    methods: {
      handleChange(val) {
        // console.log(val)
      }
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('pic123'))

      this.chart.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            roseType: 'angle',
            data: [
              { value: 235, name: '视频广告' },
              { value: 274, name: '联盟广告' },
              { value: 310, name: '邮件营销' },
              { value: 335, name: '直接访问' }
              // { value: 400, name: '搜索引擎' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
#pic123 {
  text-align: center;
  display: flex;
  justify-content: center;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-name{
  padding-bottom: 20px;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

.github-corner {
  position: absolute;
  top: 0px;
  border: 0;
  right: 0;
}
</style>
