<template>
  <div class="icon_img">
    <img :src="imgUrl" :style="imgStyle" alt="" />
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
