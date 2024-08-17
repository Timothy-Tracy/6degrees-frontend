import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

function useFetchNodeQueriesByUsername(uname){
    const [queries, setQueries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {APIObj} = useAPI();
    const {debug} = useDebug();
    const [username, updateUsername] = useState(uname || null)

    async function fetchNodeQueriesByUsername(usernameParam) {
        debug(`Fetching node queries by username ${usernameParam}`, 'useFetchNodeQueriesByUsername Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/${usernameParam}/node-queries`)
        .then((response) =>{
            console.log('fetchNodeQueriesByUsername fetch', response.data.data)
            setQueries(response.data.data);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }
    


  return { queries, updateUsername,fetchNodeQueriesByUsername, isLoading, error };
}

export default useFetchNodeQueriesByUsername;