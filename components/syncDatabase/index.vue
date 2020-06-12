<template>
  <div>
    <el-button @click="databaseSync">同步数据库</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    async databaseSync() {
      const { status, data } = await this.$axios.get('/mysql/sync')
      if (status !== 200) {
        this.$confirm(
          `服务器错误，状态${status}，请联系管理员或稍后重试！`,
          '服务器错误',
          {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
          }
        )
      } else {
        console.log('data', data)
      }
    }
  }
}
</script>
