import React from "react";
import { useWatchList } from "../../context/watchListContext";
import { useNavigate } from "react-router-dom";
import "./WatchList.css";
import NavBar from '../../components/NavBar/NavBar'

const WatchList = () => {
    const {watchList, removeFromWatchList}= useWatchList();
    const navigate= useNavigate();

    if(watchList.length === 0){
        return <h2> Your Watchlist is empty</h2>
    }

    return (
        <div className="watchlist">
            < NavBar/>
            <div className="contents">
                <h1> My list</h1>

                <div className="list">
                     { watchList.map ((movie) => (
                <div className="watchlist-card" key={ movie.id }>
                    <img src={ `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="" 
                    onClick={ () => navigate(`/movie/${ movie.id}`)}

                    />
                    <h3>{ movie.title}</h3>
                    <button onClick={ () =>removeFromWatchList(movie.id)}>
                        Remove
                    </button>

                </div>
            ))}


                </div>
            </div>

        </div>
    )
}

export default WatchList;