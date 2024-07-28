import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

function useFetchResponseData(){
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {APIObj} = useAPI();
    const {debug} = useDebug();

  useEffect(() => {
    async function fetchProfile() {
        debug('Fetching profile data', 'useFetchResponseData Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/nodes/`)
        .then(({data}) =>{
            setProfile(data);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }
    

    fetchProfile();
  }, []);

  return { profile, isLoading, error };
}

export default useFetchResponseData;