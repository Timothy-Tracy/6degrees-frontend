import { useEffect, useState } from "react";
import { useDebug } from "../components/context/DebugContext";

function useNode(){
    const [node, setNode] = useState(null);
    const [prevNode, setPrevNode] = useState(null)
    const {debug} = useDebug()
    useEffect(()=>{
        debug(`Node Value Changed ${JSON.stringify(node,null,2)}`, 'useNode Hook')
    }, [node])

    return {node, setNode, prevNode, setPrevNode}
}

export default useNode;