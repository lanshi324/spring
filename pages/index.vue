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
          <el-col :span="2" class="col_item_fu">
            <name class="col_item" />
          </el-col>
          <el-col :span="2" class="col_item_fu">
            <sign class="col_item" />
          </el-col>
          <el-col :span="2" class="col_item_fu">
            <myself class="col_item" />
          </el-col>
        </el-row>
        <el-row class="home-menu-body">
          <el-col :span="6">
            <!-- <el-button size="medium" plain class="btn"> -->
            <test :img-path="imgPath" :menu-name="menuName" :info="info" />
            <!-- </el-button> -->
          </el-col>
          <el-col :span="6">
            <!-- <el-button size="medium" plain class="btn"> -->
            <test :img-path="imgPath" :menu-name="menuName" :info="info" />
            <!-- </el-button> -->
          </el-col>
          <el-col :span="6">
            <!-- <el-button size="medium" plain class="btn"> -->
            <test :img-path="imgPath" :menu-name="menuName" :info="info" />
            <!-- </el-button> -->
          </el-col>
          <el-col :span="6">
            <!-- <el-button size="medium" plain class="btn"> -->
            <test :img-path="imgPath" :menu-name="menuName" :info="info" />
            <!-- </el-button> -->
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
      menuName: '菜单名',
      info: {
        desc: '做人不应该是这样的',
        // img_path: this.imgPath,
        // menuName: this.menuName,
        url: 'login'
      }
    }
  }

  // methods: {
  //   menu_list() {
  //     alert('3321')
  //     console.log('456')
  //     this.$router.push({
  //       path: './login/',
  //       params: { id: '做人不应该是这样的' }
  //     })
  //   }
  // }
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
    .home-menu-body {
      width: 100%;
      display: flex;
      align-content: space-around;
      text-align: center;
    }
  }
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
@media screen and (max-width: 420px) {
  .home {
    width: 100%;
    padding: 0;
    .home-notice {
      width: 25%;

      .home-notice-header {
        width: 100%;
        text-align: center;
        line-height: 6vh;
        font-size: 1vh;
        background-color: $headerBgcolor;
        height: 6vh;
      }
      .home-notice-body {
        width: 100%;
        background-color: rgba(240, 248, 255, 0.452);

        max-height: 74vh;
        min-height: $bodyHeight;
        text-align: center;
        .com-notice {
          height: 100vh;
          text-align: center;
          .notice-item {
            margin: auto;
            border-bottom: 1px dashed white;
            height: 8.3vh;
            width: 100%;
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
      width: 73%;
      height: 100vh;
      .home-menu-header {
        width: 100%;
        background-color: $headerBgcolor;
        height: 6vh;
        display: flex;

        justify-content: space-around;

        .col_item_fu {
          margin-right: 3.6vh;
          .col_item span {
            font-size: 0.1px;
          }
        }
      }

      .home-menu-body {
        width: 100%;
        height: 100%;
        display: flex;
        align-content: space-around;
        // text-align: center;
        margin-left: 0;
        // margin-top: 1px;
      }
    }
  }
}
</style>
