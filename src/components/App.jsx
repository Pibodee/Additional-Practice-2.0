import { fetchMovies } from 'services/fetch';
import { Button } from './Button/button';
import { useState, useEffect } from 'react';
import { moviesMapper } from 'helpers/moviesMapper';
import { MoviesList } from './MoviesList/moviesList';
import { Loading } from './Loader/loader';
import { Modal } from './Modal/modal';

export const App = () => {
  const [isMoviesShown, setIsMoviesShown] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(``);
  const [posterImage, setPosterImage] = useState(``)

  useEffect(() => {
    if (!isMoviesShown) {
      setMovies([])
      return;
    }
    setIsLoading(true);

    fetchMovies(page)
      .then(({ data: { results } }) => {
        setMovies(prevState => [...prevState, ...moviesMapper(results)]);
        setIsError('');
      })
      .catch(error => setIsError(error.message))
      .finally(() => setIsLoading(false));
  }, [isMoviesShown, page]);

  const showMoviesList = () => {
    setIsMoviesShown(prevState => !prevState);
  };

  const handleDelete = (movieId) => {
    setMovies(prevState => prevState.filter(({id}) => id !== movieId))
  }

  const changeStatus = (movieId) => {
    setMovies(prev => prev.map((movie) => {
      if (movie.id === movieId) {
        return {...movie, isWatched: !movie.isWatched}
      }
      return movie;
    }))
  }

  const openModal = poster => {
    setPosterImage(poster);
  }

  const closeModal = () => {
    setPosterImage(``);
  };

  return (
    <>
      <Button
        text={isMoviesShown ? 'HideMoviesList' : 'Show Movies List'}
        clickHandler={showMoviesList}
      />
      {isMoviesShown && <MoviesList movies={movies} onDelete={handleDelete} changeStatus={changeStatus} openModal={openModal} />}
      {isLoading && <Loading />}
      {posterImage && <Modal image={posterImage} closeModal={closeModal} />}
    </>
  );
};
