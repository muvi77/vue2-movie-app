<template>
  <div>
    <!-- <hello /> -->
    <Header />
    <router-view />
    <Footer />
  </div>
</template> 

<script>
// import Hello from '@/components/Hello.vue'
// import Hello from '@/components/Hello'
// import heropy from 'npm_test'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
    components: {
        // Hello,
        Header,
        Footer
    },
    // mounted () {
    //   const u = heropy(['A', 'B', 'C', 'A', 'B'])
    //   console.log("[u] : " + u)
    // }
}
</script>

<style lang="scss" scoped></style>



// <style lang="scss">
// @import "./scss/main.scss";
// </style>
// sass-loader 사용하기 위해 이부분은 있어야함!!