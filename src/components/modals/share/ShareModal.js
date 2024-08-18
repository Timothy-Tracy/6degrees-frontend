import { ModalTitle } from "react-bootstrap";
import { Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useDebug } from "../../context/DebugContext";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton";
import { useEffect } from "react";
//Needs to be injected with a node that is your own.
//If you do not have one that is your own, it makes one
const ShareModal = ({show, handleClose, node}) =>{
    const {debug} = useDebug();
    
    useEffect(()=>{
        if(show){
            //debug(JSON.stringify(node), 'Share Modal Node Information')

        }
       
    }, [node])

    return(
        <>
            
             <Modal className='modal border-5 border-info rounded-5' isOpen={show} toggle={handleClose} centered style={{
                border: '2px solid #007bff'
             }}>
                <ModalHeader>Share</ModalHeader>
                <ModalBody>
                <Row className='py-3'>
                        <Row>
                            {'Your Share Link: '}
                        </Row>
                        <Row>
                        <span>https://localhost:3000/posts/{node?.EDGE_QUERY}</span>
                        <CopyToClipboardButton text={`https://localhost:3000/posts/${node?.EDGE_QUERY}`}></CopyToClipboardButton>
                        </Row>
                    </Row>
                    <Row className='py-3'>
                        <Row>
                            {'Degree of separation: '}
                        </Row>
                        <Row>
                        <span>{node?.degree}</span>
                        </Row>
                    </Row>
                    
                    <Row className='py-3'>
                        <Row>
                            {'Who can see that you\'ve been here?: '}
                        </Row>
                        <Row>
                            <span>{node?.visibility}</span>
                        </Row>
                    </Row>
                    
                    <p> </p>
                </ModalBody>
                <p>test</p>
            </Modal>
        </>
    )
}

export default ShareModal;