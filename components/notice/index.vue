<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <el-row class="notice-item">
        <span class="text">{{ item }}</span>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6]
    }
  }
}
</script>
