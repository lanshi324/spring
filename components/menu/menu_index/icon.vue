<template>
  <div class="icon_img">
    <img :src="imgUrl" alt="" />
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      img: this.imgUrl,
      imgStyle: {
        width: '50%'
      }
    }
  }
}
</script>

<style lang="scss">
.icon_img {
  margin-top: 5%;
  // margin-right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 80%;
  }
  span {
    margin-top: 5%;
  }
}

// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
@media screen and (max-width: 420px) {
  .icon_img {
    display: flex;
    flex-direction: column;
    // margin-left: 5px;
    align-items: center;
    width: 42px;
    margin-top: 0px;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      margin-top: 7px;
      font-size: 4px;
    }
  }
}
</style>
