// UserContext.js
import React, { createContext, useContext, useState } from 'react';

import { useEffect } from 'react';
import { useDebug } from './DebugContext';
import { useAPI } from "./APIContext";
import axios from 'axios'; 
import useError from '../hooks/useError';
import { useGlobalError } from '../context/ErrorContext';
import withAsyncErrorHandler from '../errors/withAsyncErrorHandler';


const UserContext = createContext();

const UserProvider = ({ children }) => {

  const { error, handleError, clearError } = useError();
  const { globalError, setError: setGlobalError, clearError: clearGlobalError } = useGlobalError();
  const {debug} = useDebug();
  const name = "<UserContext>";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [status, setStatus] = useState(()=>{if(localStorage.getItem('token') != null ){return true; }else{return false}});
  const {API, APIObj} = useAPI();
  const [isAdmin, setIsAdmin] = useState(false);

  const newStatus = (value) => {
    setStatus(value);
  }

  const refreshUserContext = async() => {
    debug('refreshing user context')
    try{
      const response = await APIObj.get('/api/auth/verify');
      console.log(response)
    if (response.status == 200){
      setStatus(true);
      setUser(response.data)
    }

    } catch(error){
      setGlobalError(error)
    //
      //handleError(error)
    }
    
  }

  //login. self-explanatory
  const login = (userData, jwtToken, status) => {
    setStatus(status);
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
  };

  //A side effect for if the user object changes
  useEffect(()=>{
    debug('useEffect, dependency: userContext user')
    if(user != undefined){
      debug('user exists')
      refreshAdmin()
    } else {
      debug('user does not exist')
    }
    
  }, [user])

  //After the token state object has been updated upon login, update the user obj
  useEffect(()=>{
    debug('useEffect, dependency: userContext token')
    refreshUserContext()
    if(token != undefined){
      debug('token exists, updating user data')
      updateUserData();
    } else {
      debug('token does not exist')
    }
    
  }, [token])
  
//fetch the user data from the API
  const fetchUserData = async () => {
    debug("Fetching User Data in UserContext");
    try {
      const response = await APIObj.get(`${API}/api/auth/verify`);
      if (response.data) {
        return response.data;
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      setGlobalError(error)

      console.error('Error fetching user data:', error);
      return null; 
    }

  };
//Refresh/Update the user state obj with data from the API
  const updateUserData = async () => {
    debug("Updating User Data in UserContext")
    const x = await fetchUserData();
    setUser(x);
  }
//Refresh/Update if the current user is an admin or not.
  const refreshAdmin = () => {
    if(user != undefined){
      if(user.role === 'ROLE_ADMIN' && status === true){
        setIsAdmin(true)
      } 
    }else {
      return false
    }
  }
  //Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    newStatus(false);
    setIsAdmin(false)
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, status, newStatus, updateUserData, isAdmin,refreshUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };

