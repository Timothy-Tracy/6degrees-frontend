import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

function usePost(){
    const [post, setPost] = useState(null)

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {APIObj} = useAPI();
    const {debug} = useDebug();


   
    const fetchPost= async (query) => {
       
        
          
       
        debug('Fetching node by query', 'useNode Hook')
      setIsLoading(true);
      setError(null);
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        const response = APIObj.get(`/api/posts/${query}`)
        .then((response) =>{
            console.log(response, 'fetchPost request')
            setPost(response.data.post[0]);
        })
        .catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
      }
     
    
 

  return { post, isLoading, error, fetchPost };
}

export default usePost;