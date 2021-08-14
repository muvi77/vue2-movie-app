const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function (event) {
  // POST 
  const payload = JSON.parse(event.body)
  console.log("/// payload /// " + payload)


  const { title, type, year, page, id } = payload

  const url = id
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  const { data } =  await axios.get(url)

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }


  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     name: 'HEROPY',
  //     age: 85
  //   })
  // }
}