import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import './MoviesGrid.css'

const Search = () => {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const query = searchParams.get('q')

  const getSearchedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovies(data.results)
  }

  useEffect(() => {
    getSearchedMovies(`${searchURL}?${apiKey}&query=${query}`)
  }, [query])

  return (
    <div className='container'>
      <h2 className='title'>Resultados para: <span className='query-text'>{query}</span></h2>
      <div className='movies-container'>
        {movies.length === 0 && <p>Não há filmes para a busca informada...</p>}
        {movies.length > 0 && movies.map(movie => movie.poster_path && <MovieCard movie={movie} key={movie.id}/>)}
      </div>
    </div>
  )
}

export default Search