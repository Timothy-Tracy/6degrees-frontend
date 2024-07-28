import { ModalTitle } from "react-bootstrap";
import { Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useDebug } from "../../context/DebugContext";

const ShareModal = ({show, handleClose, node}) =>{
    const {debug} = useDebug();
    debug(`ShareModal show = ${show}`)
    return(
        <>
        
             <Modal isOpen={show} toggle={handleClose} centered>
                <ModalHeader>Share</ModalHeader>
                <ModalBody>
                <Row className='py-3'>
                        <Row>
                            {'Your Share Link: '}
                        </Row>
                        <Row>
                        <span>https://localhost:3000/posts/{node?.EDGE_QUERY}</span>
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