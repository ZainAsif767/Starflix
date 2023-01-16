import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import SearchIcon from './search.svg'
import { nanoid } from 'nanoid'

export default function App() {
  const [movies, setMovies] = useState([])
  const apiURL = "http://www.omdbapi.com?apikey=2b1c8c2f"

  const movie = {
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2I4OTllM2MtMWVhNC00MjkzLWJlMDUtN2FhMGQ2ZGVjMjllXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg",
    "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
    " Type": "movie",
    "Year": "2016",
    " imdbID": "tt18689424"
  }

  const searchMovies = async (title) => {
    const response = await fetch(`${apiURL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Batman')
  }, [])

  const movieElements = movies.map(movie => <MovieCard key={nanoid()} movie={movie} />)
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

  return (
    <div className='app'>
      <h1>ZAINFLIX</h1>
      <div className='search'>
        <input
          placeholder='Search Movie'
          value='Batman'
          onChange={() => { }}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => { }}
        />
      </div>
      {showMovie}


    </div>
  )
}
