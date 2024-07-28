// APIContext.js
import React, { createContext, useContext, useState } from 'react';
import { useDebug } from './DebugContext';
import axios from 'axios';

const APIContext = createContext();

const APIProvider = ({ children }) => {
  const {debug} = useDebug();
  const x = "<APIProvider>"
  const host = "76.170.139.28";
  const localhost = "localhost"
  const port = "5454"

  //ATTENTION, IF YOU WANT TO CHANGE API SOURCE, CHANGE THE HOST BELOW TO host or localhost
  const [API,setAPI] = useState(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`);
  const [APIURL,setAPIURL] = useState(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`);

  const [APIMode, changeAPIMode] = useState(true);

  const setAPIMode = (value) => {
    changeAPIMode(value);
  }

  const APIObj = axios.create({
      baseURL: `${APIURL}`, // Your server URL
      withCredentials: true
    });
  
 
  return (
    <APIContext.Provider value={{ API, setAPIMode, APIMode, APIObj }}>
      {children}
    </APIContext.Provider>
  );
};

const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within a APIProvider');
  }
  return context;
};



export { APIProvider, useAPI };
