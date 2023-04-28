import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterScreen } from './screens/RegisterScreen'
import Footer from '../src/components/Footer'
import Header from './components/Header'

function App() {
  const dispatch = useDispatch()
  return (
    <>
    <Header/>
    <Router>     
      <>
      <Routes>
        <Route path='/register' element={<RegisterScreen />} exact />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/' element={<HomeScreen/>}/>
      </Routes>
      </>
      
    </Router>
    <Footer/>
    </>
  )
}

export default App
