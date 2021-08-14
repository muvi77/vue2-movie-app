<template>
  <div
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
    }"
    :class="{ absolute, fixed }"
    class="spinner-border text-primary"></div>
</template>

<!--
:class="{ absolute: absolute, fixed: fixed }" // 이름 같으면 생략 가능 
-->

<script>
export default {
  // 부모컴포넌트한테 받을 때
  props: {
    size: {
      type: Number,
      default: 2,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border {
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>