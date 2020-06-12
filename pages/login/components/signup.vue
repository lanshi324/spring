<template>
  <div class="login">
    <el-form
      ref="user"
      :model="user"
      status-icon
      :rules="rules"
      label-width="100px"
      class="form"
    >
      <el-form-item label="">
        <span class="title">用户注册</span>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="user.userName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="注册邮箱" prop="email">
        <el-input v-model="user.email" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="user.verificationCode" type="text">
          <el-button
            slot="append"
            icon="el-icon-message"
            class="getCode"
            :disabled="message.disabled"
            @click="getCode"
          >
            <span>{{ message.getCode }}</span>
            <span v-show="message.codeTime !== 0" style="color: #40D9FF"
              >{{ message.codeTime }} 秒</span
            >
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item v-if="!message.codePars">
        <el-button
          type="primary"
          style="color: #fff"
          @click="verifyCode(message)"
          >验证</el-button
        >
        <el-button @click="resetForm('user')">重置</el-button>
        <el-button style="background: #409EFF" @click="jump">登录</el-button>
      </el-form-item>
      <el-form-item v-if="message.codePars" label="密码" prop="password">
        <el-input
          v-model="user.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="message.codePars"
        label="确认密码"
        prop="checkpassword"
      >
        <el-input
          v-model="user.checkpassword"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="message.codePars">
        <el-button
          type="primary"
          style="color: #fff"
          @click="submitForm('user')"
          >注册</el-button
        >
        <el-button @click="resetForm('user')">重置</el-button>
        <el-button style="background: #409EFF" @click="jump">登录</el-button>
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
          '/users/register/checkColumn',
          {
            userName: value
          }
        )
        if (status === 200) {
          if (data.code === 0) {
            return callback()
          } else {
            return callback(new Error(data.msg))
          }
        }
      }
    }
    const validateEmail = async (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('注册邮箱不能为空'))
      } else {
        const { status, data } = await this.$axios.post(
          '/users/register/checkColumn',
          {
            email: value
          }
        )
        if (status === 200) {
          if (data.code === 0) {
            return callback()
          } else {
            return callback(new Error(data.msg))
          }
        }
      }
    }
    const validateVerificationCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      } else {
        return callback()
      }
    }
    const validatepassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      } else {
        if (this.user.checkpassword !== '') {
          this.$refs.user.validateField('checkpassword')
        }
        return callback()
      }
    }
    const validatepassword2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        return callback(new Error('两次输入密码不一致!'))
      } else {
        return callback()
      }
    }
    return {
      user: {
        userName: 'cloudWoR',
        email: '756590854@qq.com',
        verificationCode: '',
        password: '',
        checkpassword: ''
      },
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
        email: [{ validator: validateEmail, trigger: 'blur' }],
        verificationCode: [
          { validator: validateVerificationCode, trigger: 'blur' }
        ],
        password: [{ validator: validatepassword, trigger: 'blur' }],
        checkpassword: [{ validator: validatepassword2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async validateField(option) {
      await this.$refs.user.validateField(option, (valid) => {
        if (valid) {
          this.pars = false
        } else {
          this.pars = true
        }
      })
    },
    showTime(message) {
      message.getCode = '验证码已发送'
      message.disabled = true
      message.codeTime = 60
      message.getCodeStatus = 200
      this.timerid = setInterval(() => {
        if (message.codeTime === 0) {
          message.disabled = false
          message.getCode = '再次发送'
          clearInterval(this.timerid)
        } else {
          message.codeTime--
        }
      }, 1000)
    },
    async getCode() {
      this.validateField('userName')
      this.validateField('email')
      if (this.pars) {
        const { status, data } = await this.$axios.post(
          '/users/register/getCode',
          {
            userName: this.user.userName,
            email: this.user.email
          }
        )
        if (status === 200) {
          // info属性暂时没用到
          const { code, msg } = data
          if (code === 0) {
            this.$confirm(msg, '获取成功', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success'
            })
          } else {
            this.$confirm(msg, '获取失败', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'error'
            })
          }
        }
        this.showTime(this.message)
      } else {
        this.$alert('请先填写有效的用户名及邮箱', '用户名或邮箱未填写', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.validateField('userName')
            this.validateField('email')
          }
        })
      }
    },
    async verifyCode(message) {
      await this.validateField('email')
      await this.validateField('verificationCode')
      if (this.pars) {
        const { status, data } = await this.$axios.post(
          '/users/register/verifyCode',
          {
            userName: this.user.userName,
            email: this.user.email,
            verificationCode: this.user.verificationCode
          }
        )
        if (status === 200) {
          if (data.code === 0) {
            this.$message({
              message: data.msg,
              type: 'success',
              center: true
            })
            message.codePars = true
          } else {
            this.$confirm(`验证未通过: ${data.msg} 请重试！`, '验证失败', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'error'
            })
          }
        } else {
          this.$confirm(
            `服务器错误，状态${status}，请联系管理员或稍后重试！`,
            '服务器错误',
            {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'error'
            }
          )
        }
      } else {
        this.$alert('以上信息为必填项，请确保验证通过！', '表单验证失败')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid, error) => {
        if (valid) {
          const { status, data } = await this.$axios.post(
            '/users/register',
            this.user
          )
          console.log(status, data)
          if (status === 200 && data.code === 0) {
            this.$confirm('注册成功，点击“确定”跳转至主页', '恭喜，注册成功', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success',
              beforeClose() {
                this.$router.push('/')
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
      // 为true，使父组件转向登录组件
      this.$emit('select-sign', true)
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
