import { useEffect, useState, useCallback, useMemo } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";
import useError from "../useError";
import useFetchNode from "../../api/nodes/useFetchNode";
import usePromiseTracker from "../usePromiseTracker";

/**
 * @typedef {Object} NodeState
 * @property {Object|null} data - The actual node data
 * @property {boolean} isLoading - Indicates if the data is being fetched
 * @property {string|null} error - Error message if an error occurred during fetch
 */

/**
 * @typedef {Object} UseNodeResult
 * @property {NodeState} node - The node data state
 * @property {NodeState} myNode - The user's node data state
 * @property {NodeState} postUUID - The post UUID state
 * @property {boolean} isLoading - Indicates if any data is currently being fetched
 * @property {string|null} error - Error message if an error occurred during fetch
 * @property {function(Object): void} setMyNode - Function to update myNode data
 * @property {function(): Promise<void>} refetch - Function to refetch all data
 * @property {Object<string, PromiseStatus>} fetchStatus - Status of each fetch operation
 */

/**
 * Custom hook for fetching and managing node-related data.
 * 
 * @param {string} query - The query string used to fetch node data
 * @returns {UseNodeResult} An object containing node data, loading state, error state, and utility functions
 */
function useNode(query) {
  const [state, setState] = useState({
    nodeState: { data: null, isLoading: false, error: null },
    myNodeState: { data: null, isLoading: false, error: null },
    postUUIDState: { data: null, isLoading: false, error: null },
  });

  const { APIObj } = useAPI();
  const { debug } = useDebug();
  const { withErrorHandling } = useError();

  const { fetchNodeData, fetchMyNodeData, fetchPostUuidByQuery } = useFetchNode(query);

  const nodeTracker = usePromiseTracker('nodeState');
  const myNodeTracker = usePromiseTracker('myNodeState');
  const postUUIDTracker = usePromiseTracker('postUUIDState');

  const fetchAllData = useCallback(() => {
    console.log('Starting fetchAllData', { query });

    const updateState = (key, data, error = null) => {
      setState(prevState => ({
        ...prevState,
        [key]: { 
          data: error ? null : data, 
          isLoading: false, 
          error: error ? error.message : null 
        },
      }));
    };

    setState(prevState => ({
      nodeState: { ...prevState.nodeState, isLoading: true, error: null },
      myNodeState: { ...prevState.myNodeState, isLoading: true, error: null },
      postUUIDState: { ...prevState.postUUIDState, isLoading: true, error: null },
    }));

    nodeTracker.trackPromise(fetchNodeData)
      .then(response => updateState('nodeState', response.data.data))
      .catch(error => updateState('nodeState', null, error));

    myNodeTracker.trackPromise(fetchMyNodeData)
      .then(response => updateState('myNodeState', response.data.data))
      .catch(error => updateState('myNodeState', null, error));

    postUUIDTracker.trackPromise(fetchPostUuidByQuery)
      .then(response => updateState('postUUIDState', response.data.data))
      .catch(error => updateState('postUUIDState', null, error));

  }, [query, nodeTracker, myNodeTracker, postUUIDTracker, fetchNodeData, fetchMyNodeData, fetchPostUuidByQuery]);

  useEffect(() => {
    console.log('useNode effect triggered', { query });
    fetchAllData();
  }, []);

  useEffect(() => {
    if (state.myNodeState.data) {
      console.log('myNode Data updated:', state.myNodeState.data);
    }
  }, [state.myNodeState.data]);

  const setMyNode = useCallback((newMyNode) => {
    setState(prevState => ({
      ...prevState,
      myNodeState: { ...prevState.myNodeState, data: newMyNode },
    }));
    console.log('setMyNode called:', newMyNode);
  }, []);

  const isLoading = useMemo(() => 
    state.nodeState.isLoading || state.myNodeState.isLoading || state.postUUIDState.isLoading,
  [state.nodeState.isLoading, state.myNodeState.isLoading, state.postUUIDState.isLoading]);

  const fetchStatus = useMemo(() => ({
    nodeState: nodeTracker.status,
    myNodeState: myNodeTracker.status,
    postUUIDState: postUUIDTracker.status,
  }), [nodeTracker.status, myNodeTracker.status, postUUIDTracker.status]);

  const error = useMemo(() => 
    state.nodeState.error || state.myNodeState.error || state.postUUIDState.error,
  [state.nodeState.error, state.myNodeState.error, state.postUUIDState.error]);

  useEffect(() => {
    debug('useNode hook state', { state, fetchStatus, isLoading, error });
  }, [state, fetchStatus, isLoading, error]);

  return {
    ...state,
    isLoading,
    error,
    setMyNode,
    refetch: fetchAllData,
    fetchStatus,
  };
}

export default useNode;