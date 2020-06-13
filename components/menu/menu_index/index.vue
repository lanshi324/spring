<template>
  <div>
    <el-button class="btn" :style="btn_sty" @click="menu_list">
      <imge :img-url="imgPath" :name="menuName" />
    </el-button>
  </div>
</template>

<script>
import imge from './icon'
export default {
  components: {
    imge
  },
  props: {
    imgPath: {
      type: String,
      required: true
    },
    menuName: {
      type: String,
      required: true
    },

    info: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      btn_sty: {
        width: '130px',
        height: '86px',
        padding: '3px',
        border: 'none',
        fontSize: '16px',
        marginTop: '5px',
        backgroundColor: 'unset',

        marginRight: '2%'
      },

      img_path: this.imgPath,
      menu_name: this.menuName
    }
  },

  methods: {
    menu_list() {
      alert('3321')
      console.log('456')
      console.log(this.menuName)
      console.log(this.info.url)
      // const info = {
      //   desc: '做人不应该是这样的',
      //   img_path: this.imgPath,
      //   menuName: this.menuName
      // }

      // this.$router.push({
      //   path: './login',
      //   query:
      //     // desc:
      //     { desc: '做人不应该是这样的' }
      //   // img_path: this.imgPath,
      //   // menuName: this.menuName
      // })
      const url = this.info.url
      // this.$router.push({
      //   name: url,
      //   params: this.info
      // })

      this.$router.push({
        name: url,
        params: this.info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  // width: 130px;
  // height: 36px;
  // // height: 136px;
  // padding: 3px;
  // border: none;
  // font-size: 16px;
  // margin-top: 5px;
  // background-color: unset;

  // margin-right: 2%;
}

// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------

@media screen and (max-width: 420px) {
  .btn {
    // width: 20px;
    // height: 20px;
    // // margin-top: 1px;
    // font-size: 4vh;
    // padding: 0;
    // font-size: 1px;
    // margin-right: 1vh;
  }
}
</style>
