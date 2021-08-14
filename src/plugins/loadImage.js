export default {
  install(Vue) {
    // this.$loadImage로 사용 가능 
    Vue.prototype.$loadImage = (src) => {
      // 비동기 코드 추가
      return new Promise((resolve) => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          resolve()
        })
      })
    }
  }
}