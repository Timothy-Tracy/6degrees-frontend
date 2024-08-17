import { useCallback } from 'react';
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";


/**
 * @typedef {Object} FetchNodeDataResult
 * @property {function(string, string): Promise<Object>} fetchData - Function to fetch data from a specific endpoint
 * @property {function(string): Promise<Object>} fetchAllData - Function to fetch all node-related data
 */

/**
 * Custom hook for fetching node-related data.
 * 
 * @param {string} query - The query string used to fetch node data
 * @returns {FetchNodeDataResult} An object containing functions to fetch node data
 */
function useFetchNode(query) {
  const { APIObj } = useAPI();
  const { debug } = useDebug();


  /**
   * Fetches data from a specified endpoint.
   * 
   * @param {string} endpoint - The API endpoint to fetch data from
   * @param {string} dataKey - A key to identify the type of data being fetched (for debugging)
   * @returns {Promise<Object>} The fetched data
   */
  const fetchData = useCallback(async (endpoint, dataKey) => { 
    
    
      debug(`Fetching ${dataKey} data for query: ${query}`, `useFetchNodeData Hook`);
      const response = APIObj.get(endpoint);
      console.log(`${dataKey} data response for query ${query}:`, response);
      return response;
    }
  , [query]);

  const fetchNodeData = useCallback(async() => {
    return fetchData(`/api/nodes/${query}/node`, 'node')
  }, [query, fetchData])


  const fetchMyNodeData = useCallback(async() => {
    return fetchData(`/api/nodes/v2/${query}/my/node`, 'myNode')
  }, [query, fetchData])

  const fetchPostUuidByQuery = useCallback(async() => {
    return fetchData(`/api/nodes/${query}/postUuid`, 'postUUID')
  }, [query, fetchData])


  return { fetchNodeData,fetchMyNodeData, fetchPostUuidByQuery };
}

export default useFetchNode;