import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const token = import.meta.env.VITE_API_TOKEN; //INSIRA A SUA API KEY ENTRE AS ASPAS DA CONSTANTE TOKEN

console.log("Variáveis carregadas:", import.meta.env);
console.log("API Token:", import.meta.env.VITE_API_KEY);

const App = () => {
  const [movieName, setMovieName] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async () => {
    const apiKey = token;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movieName
    )}&api_key=${apiKey}`;

    try {
      const searchResponse = await axios.get(searchUrl);
      const movieDetailsPromises = searchResponse.data.results.map(
        async (movie) => {
          const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=credits`;
          const detailsResponse = await axios.get(detailsUrl);

          const movieDetails = detailsResponse.data;
          const director = movieDetails.credits.crew.find(
            (member) => member.job === "Director"
          );

          return {
            title: movieDetails.title,
            year: movieDetails.release_date
              ? movieDetails.release_date.split("-")[0]
              : "N/A",
            country:
              movieDetails.production_countries.length > 0
                ? movieDetails.production_countries[0].name
                : "N/A",
            director: director ? director.name : "N/A",
            poster: movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
              : "generic-poster.png",
          };
        }
      );

      let movieDetails = await Promise.all(movieDetailsPromises);

      // Ordenar os resultados pelo ano de lançamento
      movieDetails = movieDetails.sort((a, b) => {
        if (a.year === "N/A") return 1;
        if (b.year === "N/A") return -1;
        return b.year - a.year;
      });

      setResults(movieDetails);
      setCurrentPage(1);
      setTotalPages(Math.ceil(movieDetails.length / 10));
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * 10;
  const currentResults = results.slice(startIndex, startIndex + 10);

  return (
    <div className="container">
      <h1>TMDB Movie Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie name"
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {results.length > 0 && (
        <>
          <ul className="movie-list">
            {currentResults.map((movie, index) => (
              <li key={index} className="movie-item">
                <img
                  src={
                    movie.poster !== "N/A"
                      ? movie.poster
                      : "/generic-poster.png"
                  }
                  alt={`${movie.title} Poster`}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h2 className="movie-title">{movie.title}</h2>
                  <p className="movie-info">Year: {movie.year}</p>
                  <p className="movie-info">Country: {movie.country}</p>
                  <p className="movie-info">Director: {movie.director}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
