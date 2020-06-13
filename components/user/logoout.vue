<template>
  <div class="com-logoout">
    <el-button v-if="isLogin" class="button" type="text">
      <span>退出登录</span>
    </el-button>
    <el-button v-else class="button" type="text">
      <span>登录</span>
    </el-button>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      const isLogin =
        this.$store.state.userName && this.$store.state.userName.userName
      return isLogin
    }
  }
}
</script>

<style lang="scss">
.com-logoout {
  .button {
    color: white;
  }
  .button:active {
    color: rgba(255, 255, 255, 0.753);
  }
}
</style>
