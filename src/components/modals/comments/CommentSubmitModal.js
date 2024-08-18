import React, { useEffect, useState } from "react";



import { useParams } from 'react-router-dom';

import { Card, Button, Modal, FormLabel, FormControl } from 'react-bootstrap'
import { CloseButton, Col, FormGroup, ModalBody, ModalHeader, Row, Form, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";


import { useAPI } from "../../context/APIContext.js";
import { useUser } from "../../context/UserContext.js";
import VisibilityInput from "../../visibility/VisibilityInput.js";
import CustomModalHeader from "../CustomModalHeader.js";


const CommentSubmitModal = ({ show, handleClose, parentComment, setParentComment, node, setSubmission }) => {


    const { APIObj } = useAPI();
    const { query } = useParams();

    const [commentText, setCommentText] = useState('');
    const [alert, setAlert] = useState()

    const { status } = useUser();

    const [toggle, setToggle] = useState(false);
    const [visibility, setVisibility] = useState('Public');

    const [visibilityOutputArray, setVisibilityOutputArray] = useState([]);

    const handleToggle = () => { setToggle(!toggle) };

    const visibilityOptions = [
        {
            checkboxLabel: 'Original Poster',
            value: 'Original Poster'
        },
        {
            checkboxLabel: 'Distribution Path',
            value: 'Distribution Path'
        },
        {
            checkboxLabel: 'Friends',
            value: 'Friends'
        },
        {
            checkboxLabel: 'Followers',
            value: 'Followers'
        },

    ]

    const specialOptions = [
        {
            value: 'public', behavior: 'exclusive'
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmission({
            NODE_UUID: node.NODE_UUID,
            body: commentText,
            PARENT_COMMENT_UUID: parentComment || "",
            visibility: visibilityOutputArray
        })

        setCommentText('');
        setParentComment(null);
        handleClose();


    };


    useEffect(() => {
        //console.log(show)
        //console.log('showmodal state change')
    }, [show])


    useEffect(() => {

    }, [])

    const DebugInfo = () => {
        return (
            <>
                <h6>Node Info</h6>
                <pre>
                    {JSON.stringify(node, null, 2)}
                </pre>
                <h6>ParentComment Info</h6>
                <pre>
                    {JSON.stringify(parentComment, null, 2)}
                </pre>
            </>
        )
    }
    if (node == null) return (<></>);
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>

            <CustomModalHeader handleClose={()=> { setParentComment(''); handleClose()}}>
                        Add A Comment
            </CustomModalHeader>
               



               
                <ModalBody>
                    <p>{parentComment ? parentComment : ''}</p>
                  
                    <p>{node?.EDGE_QUERY}</p>
                    {alert}
                    <Form onSubmit={handleSubmit}>
                        <Row>

                            <Col>
                                <strong>Who can see this comment?</strong>
                                <VisibilityInput options={visibilityOptions} outputArr={visibilityOutputArray} setOutputArr={setVisibilityOutputArray}></VisibilityInput>
                            </Col>
                        </Row>




                        <FormGroup className="mb-3" controlId="commentText">
                            <FormLabel><strong>Your Comment</strong></FormLabel>
                            <FormControl
                                as="textarea"
                                rows={3}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Submit Comment
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>)
};
export default CommentSubmitModal