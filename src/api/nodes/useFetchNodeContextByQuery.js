import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

function useFetchNodeContextByQuery(query, setNode){
    const [nodeFetched, setNodeFetched] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {APIObj} = useAPI();
    const {debug} = useDebug();

    async function fetchNodeByQuery() {
        debug('Fetching node by query', 'useFetchNodeContextByQuery Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/posts/${query}`)
        .then((response) =>{
            console.log(response)
            setNode(response.data);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }

    function fetch(){
        fetchNodeByQuery()
    }

 

  return { nodeFetched, isLoading, error, fetch };
}

export default useFetchNodeContextByQuery;