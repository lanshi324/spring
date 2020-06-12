<template>
  <div class="home">
    <el-row type="flex" justify="space-between">
      <el-col class="home-notice">
        <el-row class="home-notice-header">科室公告栏</el-row>
        <el-row class="home-notice-body">
          <notice class="com-notice" />
        </el-row>
      </el-col>
      <el-col class="home-menu">
        <el-row
          class="home-menu-header"
          type="flex"
          align="middle"
          justify="end"
        >
          <el-col :span="2">
            <name />
          </el-col>
          <el-col :span="2">
            <sign />
          </el-col>
          <el-col :span="2">
            <myself />
          </el-col>
        </el-row>
        <el-row class="home-menu-body">
          <el-col :span="6">
            <test :img-path="imgPath" :menu-name="menuName" />
          </el-col>
          <el-col :span="6">
            <test :img-path="imgPath" :menu-name="menuName" />
          </el-col>
          <el-col :span="6">
            <test :img-path="imgPath" :menu-name="menuName" />
          </el-col>
          <el-col :span="6">
            <test :img-path="imgPath" :menu-name="menuName" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import notice from '@/components/notice'
import name from '@/components/user/name'
import sign from '@/components/user/logoout'
import myself from '@/components/user/myself'
import test from '@/components/menu/menu_index'
export default {
  layout: 'home',
  components: {
    notice,
    name,
    sign,
    myself,
    test
  },
  data() {
    return {
      imgPath: require('~/assets/image/index/index.png'),
      menuName: '菜单名'
    }
  }
}
</script>

<style lang="scss">
$headerHeight: 7%;
$bodyHeight: 93%;
$headerBgcolor: rgba(34, 179, 236, 0.5);
.home {
  width: 100%;
  .home-notice {
    // background-color: rgba(15, 157, 240, 0.534);
    width: 25%;
    max-height: 70vh;
    min-height: 70vh;
    .home-notice-header {
      text-align: center;
      font-size: 3vh;
      background-color: $headerBgcolor;
      height: $headerHeight;
    }
    .home-notice-body {
      background-color: rgba(240, 248, 255, 0.452);
      max-height: $bodyHeight;
      min-height: $bodyHeight;
      text-align: center;
      .com-notice {
        margin-top: 1vh;
        text-align: center;
        .notice-item {
          margin: auto;
          border-bottom: 1px dashed white;
          height: 5vh;
          width: 95%;
          text-align: center;
          .text {
            position: absolute;
            top: 2vh;
          }
        }
      }
    }
  }
  .home-menu {
    // background-color: rgba(0, 214, 252, 0.418);
    width: 73%;
    .home-menu-header {
      background-color: $headerBgcolor;
      height: $headerHeight;
    }
  }
}
</style>
