import { ModalTitle } from "react-bootstrap";
import { Button, Card, CloseButton, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useDebug } from "../../context/DebugContext";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton";
import { useEffect } from "react";
import CustomModalHeader from "../CustomModalHeader";
//Needs to be injected with a node that is your own.
//If you do not have one that is your own, it makes one
const ShareModal = ({ show, handleClose, node }) => {
    const { debug } = useDebug();

    useEffect(() => {
        if (show) {
            //debug(JSON.stringify(node), 'Share Modal Node Information')

        }

    }, [node])

    return (
        <>

            <Modal className='' isOpen={show} toggle={handleClose} centered >
                <Container className='align-items-center trext-center'>

                    {/* <Card className=''> */}
                    
                       <CustomModalHeader handleClose={handleClose}>
                        Share
                       </CustomModalHeader>

                      
                        <ModalBody>
                            <Row className='py-3'>
                               
                                <Row>
                                    <Col xs={9}>
                                    <a href={`http://localhost:3000/posts/${node?.EDGE_QUERY}`}>
                                    http://localhost:3000/posts/{node?.EDGE_QUERY}
                                    </a>
                                    
                                    </Col>
                                    <Col xs={3}>
                                    <CopyToClipboardButton text={`https://localhost:3000/posts/${node?.EDGE_QUERY}`}></CopyToClipboardButton>

                                    </Col>
                                   
                                </Row>
                            </Row>
                    


                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color='primary' className='btn'>
                                Next
                            </Button>
                        </ModalFooter> */}


                    {/* </Card> */}


                </Container>


            </Modal>


        </>
    )
}

export default ShareModal;