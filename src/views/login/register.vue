<template>
  <div class="login-container">
    <el-form :model="loginForm" autocomplete="on" class="login-form">
      <!--             label-position="left">-->

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <el-input v-model="loginForm.userId" placeholder="请输入学号" />
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.userName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.grade" placeholder="请输入年级" />
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.department" placeholder="请输入系别" />
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.major" placeholder="请输入专业" />
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.className" placeholder="请输入班级" />
      </el-form-item>

      <el-button
        style="width:100%;
        justify-content: space-between"
        type="primary"
        @click="submit()"
      >注册
      </el-button>
      <!--      <el-form-item style="background-color: #2d3a4b;border: 0px;justify-content: space-between;padding-top: 10px ">-->
      <!--        <el-button type="primary" style="width:100%;justify-content: space-between"-->
      <!--                   @click="submit()">注册-->
      <!--        </el-button>-->

      <!--      </el-form-item>-->

    </el-form>

  </div>
</template>

<script>
import Message from 'element-ui'

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      // eslint-disable-next-line no-undef
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userId: '',
        userName: '',
        password: '',
        phone: '',
        role: 'student',
        department: '',
        major: '',
        grade: '',
        className: ''
      },
      loginRules: {
        username: [{ required: false, trigger: 'blur', validator: validateUsername }],
        password: [{ required: false, trigger: 'blur', validator: validatePassword }]
        // role: [{required: true, trigger: 'blur', validator: validatorRole}]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false
    }
  },
  watch: {
    // $route: {
    //   handler: function (route) {
    //     const query = route.query
    //     if (query) {
    //       this.redirect = query.redirect
    //       this.otherQuery = this.getOtherQuery(query)
    //     }
    //   },
    //   immediate: true
    // }
  },
  created() {

  },
  mounted() {
  },
  destroyed() {

  },
  methods: {
    // 大写提示
    // checkCapslock(e) {
    //   const {key} = e
    //   this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    // },

    submit() {
      this.loading = true
      console.log('submit start')
      if (this.isEmpty()) {
        // Message.Message.error('您的信息没有填写完全')
      }
      if (this.isEmptyAll()) {
        // console.log('发送')
        this.axios({
          method: 'post',
          url: '/login/register',
          data: {
            userId: this.loginForm.userId,
            password: this.loginForm.password,
            userName: this.loginForm.userName,
            phone: this.loginForm.phone,
            role: 'student',
            department: this.loginForm.department,
            major: this.loginForm.major,
            grade: this.loginForm.grade,
            className: this.loginForm.className
          }
        }).then((response) => {
          // eslint-disable-next-line no-undef
          console.log(response)
          if (response.data.code === 200) {
            Message.Message.info('注册成功,前往登录')
            this.$router.to('/login')
          } else {
            // Message.Message.error('您的学号已注册')
            this.$router.push({ name: 'register' })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    isEmpty() {
      if (this.loginForm.department === '') return true
      if (this.loginForm.grade === '') return true
      if (this.loginForm.className === '') return true
      if (this.loginForm.major === '') return true
      if (this.loginForm.userId === '') return true
      if (this.loginForm.userName === '') return true
      if (this.loginForm.password === '') return true
      if (this.loginForm.phone === '') return true
      return false
    },
    isEmptyAll() {
      if (this.loginForm.department === '') return false
      if (this.loginForm.grade === '') return false
      if (this.loginForm.className === '') return false
      if (this.loginForm.major === '') return false
      if (this.loginForm.userId === '') return false
      if (this.loginForm.userName === '') return false
      if (this.loginForm.password === '') return false
      if (this.loginForm.phone === '') return false
      return true
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-radio {
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;

}

.login-container {
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    //padding: 160px 35px 400px;
    padding-top: 80px;
    padding-bottom: 100px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 20px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 32px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  //.svg-container {
  //  padding: 6px 5px 6px 15px;
  //  color: $dark_gray;
  //  vertical-align: middle;
  //  width: 30px;
  //  display: inline-block;
  //}
  //.show-pwd {
  //  position: absolute;
  //  right: 10px;
  //  top: 7px;
  //  font-size: 16px;
  //  color: $dark_gray;
  //  cursor: pointer;
  //  user-select: none;
  //}

}
</style>

