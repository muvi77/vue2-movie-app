<template>
  <div class="container">
    <div 
      :class="{ 'no-result': noMovies }"
      class="inner">
      <!-- <div v-if="loading">
          Loading!
        </div> -->
      <Loader v-if="loading" />
      <div
        class="message"
        v-if="message">
        {{ message }}
      </div>
      <div class="movies">
        <!-- <div
          v-for="movie in movies"
          :key="movie.imdbID">
          {{ movie.Title }}
        </div> -->

        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID" 
          :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader'
import MovieItem from '@/components/MovieItem'

export default {
  components: {
    Loader,
    MovieItem,
  },
  computed: {
    // store > index.html 안의 모듈명 
    ...mapState('movie', [
      'movies',
      'loading',
      'message',
    ]),
    noMovies() {
      return !this.movies.length
    },
  }  
}
</script>

<style lang="scss" scoped>
// 색상 변수를 계속 가지고 와야하니 모든 프로젝트에서
// 사용하도록 webpack.config.js에 세팅 
@import "@/scss/main.scss";
// @import "@/scss/main";

.contanier {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    // .inner.no-result 
    &.no-result {
      padding: 70px 0;
    }
    .message {
      color: $gray-400;
      font-size: 20px;
    }
    .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>