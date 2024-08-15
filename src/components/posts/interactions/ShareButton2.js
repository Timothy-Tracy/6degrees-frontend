import { useEffect, useState } from "react"
import { Button, Col, Modal, ModalHeader } from "reactstrap"
import ShareModal from "./ShareModal";
import { useDebug } from "../../context/DebugContext";
import useInteract from "../../../api/nodes/useInteract";
import useFetchNodeContextByQuery from "../../../api/nodes/useFetchNodeContextByQuery";

const ShareButton2 = ({query, node, setNode, prevNode, setPrevNode, children}) =>{
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
           
        }
            

    }

    
    return (
        <>
            <div onClick={()=> { handleShare()}}>
                {children}
                </div>
            <ShareModal show={show} handleClose={handleClose} node={node}/>
        </>
    )

}
export default ShareButton2