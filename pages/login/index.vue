<template>
  <div class="page-center">
    <el-col :span="5" :offset="8">
      <signin v-if="toSignin" @select-sign="jump" />
      <signup v-else @select-sign="jump" />
    </el-col>
  </div>
</template>

<script>
import signin from './components/signin'
import signup from './components/signup'
export default {
  components: {
    signin,
    signup
  },
  data() {
    return {
      toSignin: true
    }
  },

  mounted() {
    // const info = this.$route.params.menuName
    // console.log(this.$route.query.desc)
    console.log(this.$route.params.desc)
    console.log(this.$route.params)
  },
  methods: {
    jump(toSignin) {
      this.toSignin = toSignin
    }
  }
}
</script>

<style lang="scss">
.page-center {
  .login {
    .form {
      .title {
        font-size: 50px;
        color: #40d2ff;
      }
    }
  }
}
</style>
