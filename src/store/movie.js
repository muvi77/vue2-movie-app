import axios from 'axios'
// import _uniqBy from 'lodash/uniqBy.js'
import _uniqBy from 'lodash/uniqBy'

export default {
    namespaced: true,
    state: () => ({
        movies: [],
        loading: false,
        message: 'Search for the moive title!',
        theMovie: {}
    }),
    getters: {},
    mutations: {
        // state를  범용화 시켜 활용화 하기
        updateState(state, payload) {
            // ['movies'] 만큼 돌면서 세팅 , 27line
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })

        },
        // pushMovies(state, payload) {

        // }
    },
    actions: {
        async searchMovies({ state, commit }, payload) {
            if(state.loading) return
            
            // 로딩 시작 
            commit('updateState', {
                loading: true,
                message: ''
            })

            try {

                // 서버 데이터 가져오기 : data 
                const res = await _fetchMovie(payload)
                console.log("================ [movie.js] ================")
                console.log(res)

                // 객체 구조 분해 후 res.data 빼기..
                const{ Search, totalResults } = res.data

                // movies에 넣기 : 첫페이지 
                commit('updateState', {
                    // movies: res.data.Search
                    // movies: Search
                    movies: _uniqBy(Search, 'imdbID') // 중복 제거 처리 
                })

                // res.data.Search  = 7
                // res.data.totalResults = 7

                // const total = res.data.totalResults 
                // const total = totalResults // 문자네...
                const total = parseInt(totalResults, 10) // 숫자로 변환 '266' => 266
                const pageLength = Math.ceil(total) / 10 // 26.6 => 27

                // 검색된 총 결과가 2페이지 이상인 경우
                if (pageLength > 1) {
                    // 2페이지부터 반복 처리
                    for (let page = 2; page < pageLength; page += 1) {
                        // if (page > (payload.number / 10)) { // 20 넘으면 2
                        //   break // 반복문 종료 
                        // }

                        // 반복되는 페이지 번호가 요청한 
                        if (page > (payload.number / 10))  break 
                        
                        // 추가 요청 : 비동기 
                        const res = await _fetchMovie({
                            ...payload, // 전개연산자로 풀어서 세팅 
                            page,
                        })
                        //===== 아래를 묶어서 위의 ...payload 로 전개연산자로 만듬
                        // _fetchMovie({
                        //     title: payload.title,
                        //     type: payload.type,
                        //     number: payload.number,
                        //     year: payload.year,
                        //     page,
                        // })


                        // 테스트 코딩하는데 사용
                        // --------------------------------
                        // Vue test utils
                        // Jest
                        // --------------------------------

                        // mutations 선언하지 않고 바로 사용하기 
                        const { Search } = res.data
                        commit('updateState', {
                            // 페이지별 중복 처리하기 
                            movies: _uniqBy([
                                ...state.movies,
                                // ...res.data.Search
                                    ... Search
                            ], 'imdbID')
                        })
                    }
                }
                
            } catch (error) {
                console.log('[error] : ' + error)
                commit('updateState', {
                    message: error.message,
                    movies: [],
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        },
        // 한개만 상세 검색 하기 
        async searchMovieWithId({state, commit }, payload) {
            if (state.loading) return

            commit('updateState', {
                loading: true
            })

            try {
                const res = await _fetchMovie({
                    id: payload.id
                })

                console.log("========= searchMovieWithId ==========")
                console.log(res.data)

                // theMovie: res.data (X)
                commit('updateState', {
                    theMovie: res.data
                })

            } catch (error) {
                commit('updateState', {
                    message: error.message
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        }
    },
}

/**
 * 비동기 일반함수, 호이스팅 
 * 
 * fetchMovie({
 *  title: 'asdfsafdsadf'
 * })
 * 
 * @param {*} payload 
 */ 
async function _fetchMovie(payload) {
    // const { title, type, number, year } = payload

    //---------------------------------------------
    // netlify > function > movie.js로 이동 
    //---------------------------------------------
    // const { title, type, year, page, id } = payload

    // const url = id
    // ? `https://www.omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
    // : `https://www.omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`

    // // 보간법 사용 
    // return await axios.get(url)


    // 8.14
    return await axios.post('./netlify/functions/movie', payload)
}


// async function _fetchMovie(payload) {
//     // const { title, type, number, year } = payload
//     const { title, type, year, page } = payload
//     // 보간법 사용 
//     return await axios.get(`https://www.omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`)
// }






// 기본 구조 
// export default {
//     namespaced: true,
//     state: () => ({}),
//     getters: {},
//     mutations: {},
//     actions: {},
// }