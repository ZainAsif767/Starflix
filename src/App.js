import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import SearchIcon from './search.svg'

export default function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const apiURL = "http://www.omdbapi.com?apikey=2b1c8c2f" // Api called and saved

  //  Just to understand what props to pass from API 👇
  // const movie = {
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BN2I4OTllM2MtMWVhNC00MjkzLWJlMDUtN2FhMGQ2ZGVjMjllXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg",
  //   "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
  //   "Type": "movie",
  //   "Year": "2016",
  //   "imdbID": "tt18689424" 
  // }

  // Fetching movies from API and setting data
  const searchMovies = async (title) => {
    const response = await fetch(`${apiURL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Batman')
  }, [])
  // mapping the movies array👇
  const movieElements = movies.map(movie => (
    <MovieCard key={movie.imdbID} movie={movie} />))

  // what to display if movie searched is found or not
  const showMovie = movies?.length > 0
    ? (
      <div className='container'>
        {movieElements}
      </div>
    ) : (
      <div className='empty'>
        <h2>No Movies Found ! </h2>
      </div>
    )
  function handleChange(event) {
    setSearchTerm(event.target.value)
  }
  function handleClick() {
    searchMovies(searchTerm)
  }
  function handleSubmit(event) {
    if (event.key === 'Enter') {
      handleClick()
    }
  }
  return (
    <div className='app'>
      <div>
        <h1>STARFLIX</h1>
      </div>
      <div className='search'>
        <input
          onKeyDown={handleSubmit}
          placeholder='Search Movie'
          value={searchTerm}
          onChange={handleChange}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={handleClick}
        />
      </div>
      {showMovie}


    </div>
  )
}
