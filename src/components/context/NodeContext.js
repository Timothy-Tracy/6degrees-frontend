// NodeContext.js
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const NodeContext = createContext();

const NodeProvider = ({ children }) => {

  const [node, setNode] = useState();
  const [prevNode, setPrevNode] = useState()
  



  const value = useMemo(() => {
    console.log('Node Contexct Memo')
    return({
    
    node,
    prevNode,
    setNode,
    setPrevNode
  })}, [node, prevNode]);

  return (
    <NodeContext.Provider value={value}>
      {children}
    </NodeContext.Provider>
  );
};

const useNode = () => useContext(NodeContext);

export { NodeProvider, useNode };