<template>
  <div class="login-container">

    <el-form :model="loginInfo"
             status-icon
             :rules="rules"
             ref="loginInfo"
             label-width="100px"
             class="login-container-form"
             label-position="top">
      <h2>用户登录</h2>
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user"
                  type="text"
                  v-model="loginInfo.username"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock"
                  type="password"
                  v-model="loginInfo.password"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('loginInfo')"
                   class="login-container-form-btn">登录</el-button>
        <el-button @click="resetForm('loginInfo')"
                   class="login-container-form-btn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '../../api/index'
export default {
  data: function () {
    return {
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loginInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.loginInfo).then((data) => {
            if (data.code === 110) {
              this.$message.success(data.message)
              this.$store.commit('token', data.data)
              this.$store.commit('username', this.loginInfo.username)
              this.$router.push({ path: '/home' })
            } else {
              this.$message.success(data.message)
            }
            // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.login-container {
  width: 100%;
  min-width: 1400px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #324152;
}
.login-container .login-container-form {
  width: 400px;
  margin: 0px auto;
  margin-top: 150px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: left;
}
.login-container .login-container-form .login-container-form-btn {
  width: 100%;
  margin: 0;
  margin-top: 10px;
}
</style>
