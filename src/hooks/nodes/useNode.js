import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

function useNode(query){
    const [node, setNode] = useState(null)
    const [myNode, setMyNode] = useState(null)
    const [nodeFetched, setNodeFetched] = useState(null);
    const [POST_UUID, setPOST_UUID] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {APIObj} = useAPI();
    const {debug} = useDebug();


   
    async function fetchMyNodeByQuery() {
        debug(`Fetching myNode data by query ${query}`,  `${query} useNode Hook`)
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/${query}/my/node`)
        .then((response) =>{
            console.log(`${query} myNode data response`,response.data)
            setMyNode(response.data);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }
      async function fetchNodeByQuery() {
        debug(`Fetching node data by query ${query}`, `${query} useNode Hook`)
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/${query}/node`)
        .then((response) =>{
          console.log(`${query} node data response`,response.data)

            setNode(response.data.data);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }

      async function fetchPostUuidByQuery() {
        debug(`Fetching POST_UUID data by query ${query}`,  `${query} useNode Hook`)
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/${query}/postUuid`)
        .then((response) =>{
          console.log(`${query} POST_UUID data response`,response.data)

            setPOST_UUID(response.data.POST_UUID);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }

    function fetch(){
        fetchNodeByQuery();
        fetchPostUuidByQuery()
    }
    useEffect(() => {
        fetchNodeByQuery()
        fetchMyNodeByQuery();
        fetchPostUuidByQuery()
    },[])
    useEffect(()=>{
        if(myNode){
            console.log('myNode Data updated', myNode)
        }
    }, [myNode])
 

  return { node,myNode, setMyNode, POST_UUID, isLoading, error, fetch };
}

export default useNode;