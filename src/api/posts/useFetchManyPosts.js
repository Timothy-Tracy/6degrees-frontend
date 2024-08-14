import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";
import qs from 'qs'
import useError from "../../hooks/useError";

function useFetchManyPosts(urlquery){
    console.log()
    const urlQuerify = (q) => {
        const queryString = qs.stringify(q, {
            encode: false,
            arrayFormat: 'brackets',
            allowDots: true
          })
          return queryString
    }
    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {handleError} = useError(null);
    const [query, setQuery] = useState(urlQuerify(urlquery));
    
    const {APIObj} = useAPI();
    const {debug} = useDebug();
    
    const setURLQuery = (q) => {
        
        setQuery(urlQuerify(q))
    }
    const fetchPosts = () => {
       
        debug('Fetching posts data', 'useFetchManyPosts Hook')
      setIsLoading(true);
      
     
        // Assume we have an API endpoint like '/api/profile/{userId}'
        APIObj.get(`/api/posts/user?${query}`)
        .then(({data}) =>{
            console.log(data)
            setPosts(data.data);
        })
        .catch((error)=>{
            handleError(error)
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
        
        
      }

     



  return { posts, fetchPosts, setURLQuery };
}

export default useFetchManyPosts;