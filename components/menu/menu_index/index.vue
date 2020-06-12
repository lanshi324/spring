<template>
  <div>
    <imge :img-url="imgPath" :name="menuName" />
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
    }
  }
}
</script>
