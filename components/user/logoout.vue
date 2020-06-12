<template>
  <div class="com-logoout">
    <el-button v-if="isLogin" class="button" type="text">退出登录</el-button>
    <el-button v-else class="button" type="text">登录</el-button>
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
