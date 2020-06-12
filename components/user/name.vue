<template>
  <div class="com-name">
    <el-button class="button" type="text">{{ name }}</el-button>
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.state.userName.userName
    }
  }
}
</script>

<style lang="scss">
.com-name {
  .button {
    color: white;
  }
  .button:active {
    color: rgba(255, 255, 255, 0.753);
  }
}
</style>
