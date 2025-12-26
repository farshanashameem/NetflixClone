import { createContext, useContext, useEffect, useState } from "react";

const WatchListContext=createContext();

export const WatchListProvider=({ children })=>{
    const [ watchList, setWatchList]=useState(() =>{
        return JSON.parse(localStorage.getItem("watchList")) ||[];
    });

    const addToWatchList=(movie)=>{
        setWatchList((prev) => {
            if(prev.find((m) => m.id=== movie.id)) return prev;
            return [...prev,movie];
        });

    }

    const removeFromWatchList= (id) => {
        setWatchList((prev) => prev.filter((m) =>m.id!== id));

    }

    useEffect(() =>{
        localStorage.setItem("watchList",JSON.stringify(watchList));
    },[watchList])

    return (
        <WatchListContext.Provider
          value={{ watchList, addToWatchList, removeFromWatchList}}
        >
            {children}
        </WatchListContext.Provider>
    );
}

export const useWatchList = () =>useContext(WatchListContext)