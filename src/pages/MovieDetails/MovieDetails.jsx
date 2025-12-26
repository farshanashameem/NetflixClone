import { useNavigate, useParams } from "react-router-dom"
import { useWatchList } from "../../context/watchListContext";
import { useEffect, useState } from "react";
import './MovieDetails.css'
import logo from '../../assets/logo.png'

const MovieDetails = () =>{
    const { id }=useParams();
    const navigate = useNavigate();
    const { addToWatchList }= useWatchList();

    const [ movie, setMovie]=useState(null);

    const options = {
        headers: {
            Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjI4MmJmMDVkODM3NDkyMzA5YTM3ZGNlNTU3MmVhYyIsIm5iZiI6MTc2NjM4NDQwOS4yMjU5OTk4LCJzdWIiOiI2OTQ4ZTMxOTFiMzM0OWZlYWY4Y2U2YWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fqdZ5YGMb40e2VqqT2EHYNK9BCoIH1RXEb9rDrlgI4c"
        }
    };

    useEffect (() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
        .then ((res) => res.json())
        .then ((data) =>setMovie(data));
    }, [id]);

    if(!movie) return <p>Loading...</p>;

  return (
  <div
    className="hero"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    }}
  >
    <div className="hero-overlay"></div>

    <button className="back-btn" onClick={() => navigate(-1)}>←</button>

    <div className="hero-content">
      <img src={ logo } alt="" />

      <h1 className="hero-title">{movie.title}</h1>

      <p className="hero-desc">{movie.overview}</p>

      <div className="hero-buttons">
        <button className="play-btn" onClick={() => navigate(`/player/${movie.id}`)}>▶ Play</button>
        <button className="list-btn" onClick={() => addToWatchList(movie)}>＋ Add to My List</button>
      </div>

      <div className="hero-info">
        <span>Release Date: {movie.release_date}</span>
        <span>Rating: ⭐ {movie.vote_average} / 10</span>
      </div>
    </div>
  </div>
);


}

export default MovieDetails;