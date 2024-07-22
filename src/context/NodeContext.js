// NodeContext.js
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useEffect } from 'react';
import { useDebug } from './DebugContext';
import { useAPI } from "./APIContext";
import { useGlobalError } from '../context/ErrorContext';

const NodeContext = createContext();

const NodeProvider = ({ children }) => {
  const { debug } = useDebug();
  const { globalError, setError: setGlobalError } = useGlobalError();
  const { APIObj } = useAPI();
  const [node, setNode] = useState(null);
  const [prevNode, setPrevNode] = useState(null)
  

  useEffect(() => {

  }, []); // Only run on mount

  const value = useMemo(() => ({
    node,
    prevNode,
    setNode,
    setPrevNode
  }), [node,setNode, prevNode,setPrevNode]);

  return (
    <NodeContext.Provider value={value}>
      {children}
    </NodeContext.Provider>
  );
};

const useNode = () => useContext(NodeContext);

export { NodeProvider, useNode };