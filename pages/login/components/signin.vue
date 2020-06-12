<template>
  <div class="login">
    <el-form
      ref="signin"
      :model="user"
      status-icon
      :rules="rules"
      label-width="100px"
      class="form"
    >
      <el-form-item :label="null">
        <span class="title">用户登录</span>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input
          id="userName"
          v-model="user.userName"
          v-focus="getFocus('userName')"
          type="text"
          autocomplete="off"
          @keyup.enter.native="enterUserName('password')"
        />
      </el-form-item>
      <el-form-item label="用户全称" prop="userName">
        <el-input v-model="user.name" disabled type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="user.password"
          v-focus="getFocus('password')"
          type="password"
          autocomplete="off"
          @keyup.enter.native="submitForm('signin')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="color: #fff"
          @click="submitForm('signin')"
          @keyup.enter.native="submitForm('signin')"
          >登录</el-button
        >
        <el-button @click="resetForm('signin')">重置</el-button>
        <el-button style="background: #409EFF" @click="jump">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validateUserName = async (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('用户名不能为空'))
      } else {
        const { status, data } = await this.$axios.post(
          '/users/signin/getName',
          {
            userName: value
          }
        )
        if (status === 200) {
          if (data.code === 0) {
            this.user.name = await data.data.userName
            this.$message({
              message: data.msg,
              type: 'success',
              center: true
            })
            return callback()
          } else {
            return callback(new Error(data.msg))
          }
        }
      }
    }
    const validatepassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      } else {
        return callback()
      }
    }
    return {
      user: {
        userName: 'cloudWoR',
        name: '',
        password: '123'
      },
      whoFocus: '',
      pars: false,
      message: {
        getCode: '获取验证码',
        getCodeStatus: 404,
        codeTime: 0,
        disabled: false,
        codePars: false
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: 'blur' }],
        password: [{ validator: validatepassword, trigger: 'blur' }]
      }
    }
  },
  computed: {
    getFocus: {
      get() {
        return (value) => {
          return this.whoFocus === value
        }
      },
      set(who) {
        this.whoFocus = who
      }
    }
  },
  mounted() {
    this.whoFocus = 'userName'
  },
  methods: {
    enterUserName(value) {
      this.whoFocus = value
      this.getFocus(value)
    },
    async validateField(option) {
      await this.$refs.user.validateField(option, (valid) => {
        if (valid) {
          this.pars = false
        } else {
          this.pars = true
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid, error) => {
        if (valid) {
          const { status, data } = await this.$axios.post(
            '/users/signin',
            this.user
          )
          if (status === 200 && data.code === 0) {
            this.$confirm('登录成功，点击“确定”跳转至主页', '恭喜，登录成功', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success',
              beforeClose(action, instance, done) {
                location.href = '/'
                done()
              }
            })
          } else {
            this.$confirm(
              `状态码：${status}, 返回值：${data.code}，失败信息：${data.msg}`,
              '注册失败',
              {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'error'
              }
            )
          }
        } else {
          let message = ''
          const messageArray = []
          Object.keys(error).map((key, index) => {
            messageArray.push(`${index + 1}, ${error[key][0].message}`)
          })
          message = messageArray.toString()
          this.$confirm(`验证失败：${message}`, '填写错误', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    jump() {
      // 为false，使父组件转向注册组件
      this.$emit('select-sign', false)
    }
  }
}
</script>

<style lang="scss">
.login {
  .form {
    .getCode {
      color: #409eff;
    }
    .getCode:hover {
      background-color: aquamarine;
      box-shadow: 5px 5px 3px #888888;
    }
    .getCode:active {
      background-color: rgb(114, 228, 190);
    }
  }
}
</style>
