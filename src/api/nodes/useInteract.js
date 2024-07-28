import { useState } from "react"
import { useAPI } from "../../components/context/APIContext"
import { useDebug } from "../../components/context/DebugContext"

const useInteract = (query) => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {APIObj} = useAPI();
    const {debug} = useDebug();

    const interact = () =>{
        debug('Interacting', 'useInteract Hook')
        APIObj.get(`/api/nodes/interact/${query}`)
        .then((result)=>{
            setResult(result.data.EDGE_QUERY)
        })
        .catch((error)=>{
            setError(error.message)
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }


  return {result, interact, isLoading, error };
}

export default useInteract;