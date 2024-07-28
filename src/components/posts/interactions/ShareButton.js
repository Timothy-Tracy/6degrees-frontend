import { useEffect, useState } from "react"
import { Button, Col, Modal, ModalHeader } from "reactstrap"
import ShareModal from "./ShareModal";
import { useDebug } from "../../context/DebugContext";
import useInteract from "../../../api/nodes/useInteract";
import useFetchNodeContextByQuery from "../../../api/nodes/useFetchNodeContextByQuery";

const ShareButton = ({query, node, setNode, prevNode, setPrevNode}) =>{
    const {debug} = useDebug()
    const [show, setShow] = useState(false);
    const handleShow = () =>{setShow(true)};
    const handleClose = () =>{setShow(false)}
    const {result,interact} = useInteract(query, setNode);
    const{fetch } = useFetchNodeContextByQuery(result, setNode);
    const handleShare = () => {
        debug('Handling Share', 'ShareButton');
        if(node){
            handleShow();
            return ;
        } else {
            interact();
        }
            

    }

    useEffect(()=>{
        if(result){
            fetch()
        }
    }, [result])
    return (
        <>
            <Button onClick={()=> { handleShare()}} className="btn" color="primary" size="lg" block>Share</Button>
            <ShareModal show={show} handleClose={handleClose} node={node}/>
        </>
    )

}
export default ShareButton