// DebugContext.js
import React, { createContext, useContext, useState } from 'react';

//Description and Documentation
/*
WHAT THIS COMPONENT DOES

This is a context object meant to store information about if the application
is running in debug mode, and also stores a debug() function and pass
this data anywhere in the app, seamlessly

Currently this stores : Debug (debug mode boolean) debug() (Debug Function)

HOW TO USE THIS COMPONENT:

In any desired component

import { useDebug } from './path/to/UserContext';
const {debug} = useDebug();

This pulls the debug function from the context 

DEBUG FUNCTION
debug(STRING message (mandatory), STRING currentComponent (optional))
This function writes a message to the console if debug mode is on

EXAMPLE: Write a debug message to the console

 const { debug } = useDebug();
 
 debug("Hello World", "<Shopping Cart>")

 OUTPUT: Console logs "Debug: <Shopping Cart> : Hello World"


*/

const DebugContext = createContext();

const DebugProvider = ({ children }) => {
  const [Debug,setDebug] = useState(true);


  const debug = (message, component) => {
    if(Debug){
        if(component != null){
            console.log(`Debug ${component} - ${message}`)
        } else {
            console.log(`Debug - ${message}`)
        }
        
    }
}
  return (
    <DebugContext.Provider value={{ Debug, debug}}>
      {children}
    </DebugContext.Provider>
  );
};


const useDebug = () => {
  const context = useContext(DebugContext);
  if (!context) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
};

export { DebugProvider, useDebug };
