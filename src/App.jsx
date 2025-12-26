import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import WatchList from './pages/WatchList/WatchList'
import { WatchListProvider } from './context/watchListContext'

const App = () => {


  const navigate=useNavigate();
  useEffect(()=>{

    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log("Logged in");
        navigate('/');
      }else{
        console.log("Logged out");
        navigate('/login');
      }
    })

  },[])
  return (
    <div>
       <WatchListProvider>
        <ToastContainer theme="dark"/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/movie/:id' element= { <MovieDetails/> }/>
        <Route  path='/watchlist' element= { <WatchList />}/>  
      </Routes>
       </WatchListProvider>
      
      
    </div>
  )
}

export default App
