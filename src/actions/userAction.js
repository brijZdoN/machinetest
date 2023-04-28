import axios from 'axios'
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../ActionType/userConstants'
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    
    const { data } = await axios.post(
      'https://reqres.in/api/login',
      {  "email": email,
         "password": password, },
      config
    )
      if(data) {
        localStorage.setItem("token", data.token)
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        })
      }
  
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    
    const { data } = await axios
      .post('https://reqres.in/api/register', {
        "email": email,
        "password": password,
      },
      config
      )
      if(data) {
        localStorage.setItem("token", data.token)
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        })
      }
      
    

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  
}
