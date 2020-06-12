<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <img class="icon" src="~/assets/image/icon/SpringRain.png" alt="" />
          </el-col>
          <el-col :span="3">
            <sync />
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import sync from '@/components/syncDatabase'
export default {
  components: {
    sync
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.el-header {
  border-bottom: 1px solid rgb(3, 162, 255);
  .icon {
    margin-top: 5px;
    height: 50px;
  }
}
.el-main {
  min-height: calc(100vh - 120px);
  max-height: calc(100vh - 120px);
}
.el-footer {
  text-align: center;
  line-height: 60px;
}
</style>
