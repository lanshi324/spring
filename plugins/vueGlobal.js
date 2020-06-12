import Vue from 'vue'
export const focus = Vue.directive('focus', function(el, binding) {
  // 聚焦元素
  console.log('v-focus', el.className.split('-'))
  const className = el.className.split('-')[1]
  if (binding.value) {
    el.querySelector(className).focus()
  } else {
    el.querySelector(className).blur()
  }
})
