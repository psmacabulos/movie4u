import { useEffect, useState } from 'react';

import SearchIcon from './search.svg';

import './App.css';

import MovieCard from './MovieCard';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');

  const API_URL = 'https://www.omdbapi.com/?apikey=cb3ff969';

  const movieSearch = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    const movieList = data.Search;
    setMovies(movieList);
  };

  useEffect(() => {
    movieSearch('spiderman');
  }, []);

  return (
    <div className='app'>
      <h1>Movies 4 You!</h1>
      <div className='search'>
        <input
          placeholder='What is your favorite?'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <img src={SearchIcon} alt='search' onClick={() => movieSearch(title)} />
      </div>
      {movies !== undefined ? (
        <div className='container'>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
