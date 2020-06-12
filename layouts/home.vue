<template>
  <el-container class="container">
    <el-main class="main">
      <el-row class="header" :gutter="20">
        <el-col :span="12" :offset="6">
          <el-row class="row" :gutter="20" type="flex" align="middle">
            <el-col :span="5">
              <img class="logo" src="~/assets/image/icon/logo.jpg" alt="" />
            </el-col>
            <el-col>
              <span class="title">春雨放射科管理平台</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="body">
        <nuxt />
      </el-row>
    </el-main>
  </el-container>
</template>

<style lang="scss">
.container {
  .main {
    min-height: 100vh;
    max-height: 100vh;
    .header {
      height: 18vh;
      .row {
        display: flex;
        .logo {
          width: 8vw;
          border-radius: 20%;
        }
        .title {
          font-size: 6vh;
        }
      }
    }
    .body {
      margin: auto;
      background-color: rgba(255, 255, 255, 0.11);
      max-height: 70vh;
      min-height: 70vh;
      max-width: 70vw;
      min-width: 70vw;
    }
  }
}
</style>
