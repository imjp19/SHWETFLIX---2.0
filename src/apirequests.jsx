
const apirequests = {
    fetchShwetflixOriginals: `?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213`,
    fetchTrending :`/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    fetchTopRated: `/top_rated/?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,

//    genre_list : 
    fetchGenreList :`/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
//    genre_movies :
    fetchGenreMovies: `?api_key=${process.env.REACT_APP_API_KEY}&with_genres=`,
// moviedetails : 
    fetchmoviedetails : `?api_key=${process.env.REACT_APP_API_KEY}&language=en_US`,
// searchmovie : 
    fetchSearch: `?&api_key=${process.env.REACT_APP_API_KEY}&query=`

}

export default apirequests;