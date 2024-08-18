import { useEffect, useCallback, useMemo, useRef } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";
import useError from "../useError";
import useFetchNode from "../../api/nodes/useFetchNode";
import usePromiseTracker from "../usePromiseTracker";
import useAppDataState from "../useAppDataState";
import { useDeepCompareMemoize } from "../useDeepCompareMemoize";
import { useDependencyChangeTracker } from "../useDependencyChangeTracker";

function useNode(query) {
  const { state, updateStateData, updateStateIsLoading, setStateFetchFunction, getIsLoading, getError } = useAppDataState({
    nodeState: { data: null, isLoading: false, error: null, fetch: () => {} },
    myNodeState: { data: null, isLoading: false, error: null, fetch: () => {} },
    postUUIDState: { data: null, isLoading: false, error: null, fetch: () => {} },
  });

  const { APIObj } = useAPI();
  const { debug } = useDebug();
  const { withErrorHandling } = useError();
  

  const { fetchNodeData, fetchMyNodeData, fetchPostUuidByQuery } = useFetchNode(query);

  const nodeTracker = usePromiseTracker('nodeState');
  const myNodeTracker = usePromiseTracker('myNodeState');
  const postUUIDTracker = usePromiseTracker('postUUIDState');
  const signatureRef = useRef(Math.floor(Math.random() * 100));



  const setFetchFunctions = useCallback(()=>{
    
    
    setStateFetchFunction('nodeState', () => {
      updateStateIsLoading('nodeState', true);
      nodeTracker.trackPromise(fetchNodeData)
        .then(response => updateStateData('nodeState', response.data.data))
        .catch(error => updateStateData('nodeState', null, error));
    });

    setStateFetchFunction('myNodeState', () => {
      updateStateIsLoading('myNodeState', true);
      myNodeTracker.trackPromise(fetchMyNodeData)
        .then(response => updateStateData('myNodeState', response.data.data))
        .catch(error => updateStateData('myNodeState', null, error));
    });

    setStateFetchFunction('postUUIDState', () => {
      updateStateIsLoading('postUUIDState', true);
      postUUIDTracker.trackPromise(fetchPostUuidByQuery)
        .then(response => updateStateData('postUUIDState', response.data.data))
        .catch(error => updateStateData('postUUIDState', null, error));
    });
  }, [nodeTracker.signature, myNodeTracker.signature,postUUIDTracker.signature, fetchNodeData, fetchMyNodeData, fetchPostUuidByQuery])


  
  const fetchAllData = useCallback(() => {
    
    console.log(`Starting fetchAllData`, { query });
    console.log(`signature
      ${state.nodeState.fetch.toString()}`
    )
    state.nodeState.fetch();
    state.myNodeState.fetch();
    state.postUUIDState.fetch();
  }, [state.nodeState.fetch, state.myNodeState.fetch, state.postUUIDState.fetch]);


  useEffect(()=>{
    fetchAllData();

  }, [state.nodeState.fetch, state.myNodeState.fetch, state.postUUIDState.fetch])
  useEffect(() => {
    console.log('Setting fetch functions and fetching data');
    setFetchFunctions();
   
    
  }, []);

  useEffect(() => {
    if (state.myNodeState.data) {
      console.log('myNode Data updated:', state.myNodeState.data);
    }
  }, [state.myNodeState.data]);

  const setMyNode = useCallback((newMyNode) => {
    updateStateData('myNodeState', newMyNode);
    console.log('setMyNode called:', newMyNode);
  }, [updateStateData]);

  const fetchStatus = useMemo(() => ({
    nodeState: nodeTracker.status,
    myNodeState: myNodeTracker.status,
    postUUIDState: postUUIDTracker.status,
  }), [nodeTracker.status, myNodeTracker.status, postUUIDTracker.status]);

  useEffect(() => {
    console.log('useNode hook state', state);
  }, [ fetchStatus, getIsLoading(), getError()]);

  useEffect(()=>{
    console.log('Debug Callback: i run whenever the setFetchFunctions callback initializes or changes')
  }, [setFetchFunctions])

  useEffect(()=>{
    console.log('Debug Callback: i run whenever the fetchAllData callback initializes or changes')
  }, [fetchAllData])

 

  return {
    ...state,
    isLoading: getIsLoading(),
    error: getError(),
    setMyNode,
    refetch: fetchAllData,
    fetchStatus,
  };
}

export default useNode;