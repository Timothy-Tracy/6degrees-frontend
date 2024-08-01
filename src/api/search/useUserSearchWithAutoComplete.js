import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

function useUserSearchWithAutocomplete(){
    const [results, setResults] = useState([]);
    const [prefix, setPrefix] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {APIObj} = useAPI();
    const {debug} = useDebug();

    async function fetchResults() {
        debug('Fetching search Results', 'useUserSearchWithAutocomplete Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.post(`/api/search/users/${prefix}`)
        .then(({data}) =>{
            console.log(data)
            setResults(data);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }
  useEffect(() => {

    
    if(prefix){
        fetchResults();
    }
    
  }, [prefix]);

  return { results, setPrefix, error };
}

export default useUserSearchWithAutocomplete;