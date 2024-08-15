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
        debug('Fetching node by query', 'useNode Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/${query}/my-node`)
        .then((response) =>{
            console.log(response)
            setMyNode(response.data.data);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }
      async function fetchNodeByQuery() {
        debug('Fetching node by query', 'useNode Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/${query}/node`)
        .then((response) =>{
            console.log(response)
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
        debug('Fetching post uuid by query', 'useNode Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/${query}/postUuid`)
        .then((response) =>{
            console.log(response)
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
 

  return { node,myNode, POST_UUID, isLoading, error, fetch };
}

export default useNode;