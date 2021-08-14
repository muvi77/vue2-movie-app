<template>
  <div>
    <!-- <h1>Home!!!</h1> -->
    <!-- 컴포넌트 활용 부분 -->
    <Headline />
    <Search />
    <MovieList />
  </div>
</template>

<script>
import Search from '@/components/Search'
import MovieList from '@/components/MovieList'
import Headline from '@/components/Headline'

export default {
    components:  {
        Search,
        MovieList,
        Headline
    },
}
</script>