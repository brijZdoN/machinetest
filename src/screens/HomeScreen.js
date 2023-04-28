import { useDispatch,useSelector } from 'react-redux'
import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Button} from 'react-bootstrap'
import { USER_LOGOUT } from '../ActionType/userConstants'
const HomeScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const userinfo = useSelector((state) => state.userLogin.userInfo)

  const handleLogout=()=>
  {
    localStorage.clear()
    dispatch({type:USER_LOGOUT})
    console.log('logout')
    history('/login')
  }
  useEffect(()=>{
        if(!localStorage.getItem('token')){
            history('/login')
        }
        console.log(userinfo)
  },[])
  return( 
  <div className='text-center maindiv'>
    <h1 >hello from main screen</h1>
  <Button variant='primary' 
            onClick={handleLogout}
            >
              Logout
          </Button>
  </div>)
}
export default HomeScreen
