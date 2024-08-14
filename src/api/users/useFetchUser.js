import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

function useFetchUser(){
    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {APIObj} = useAPI();
    const {debug} = useDebug();

    async function fetchResults() {
        debug('Fetching Results', 'useFetchUser Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/users/${username}`)
        .then(({data}) =>{
            console.log(data)
            setUserData(data);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }
  useEffect(() => {

    
    if(username){
        fetchResults();
    }
    
  }, [username]);

  return { userData, setUsername, error };
}

export default useFetchUser;