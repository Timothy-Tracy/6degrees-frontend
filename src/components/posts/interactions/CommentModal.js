import React, { useEffect, useState, useCallback, memo } from "react";
import { useAPI } from "../../../context/APIContext"
import { useParams } from 'react-router-dom';
import { useGlobalError } from '../../../context/ErrorContext';
import { Card, Button, Modal, Form } from 'react-bootstrap'
import { Col, Row } from "reactstrap";
import GlobalErrorComponent from "../../../errors/GlobalErrorComponent";
import TimeAgo from "../../../tools/TimeAgo";
import { useNode } from "../../../context/NodeContext.js";
import { useUser } from "../../../context/UserContext.js";

const CommentModal = ({show, handleClose, parentComment, setParentComment}) => {
    const { prevNode, setPrevNode, node, setNode } = useNode();
    const { APIObj } = useAPI();
    const { query } = useParams();

    const [commentText, setCommentText] = useState('');
    const [alert, setAlert] = useState()
 
    const {status} = useUser();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await APIObj.post(`/api/comments`,
                {
                    NODE_UUID : node.NODE_UUID,
                    body: commentText,
                    PARENT_COMMENT_UUID : parentComment || ""
                }
            );
            setCommentText('');
            handleClose();
            
        } catch (error) {
          
        }
    };

    if(!node){
        if(status){
            console.log('interacting with node')
            const response = APIObj.get(`/api/nodes/interact/${query}`)
            .then(response => {
                console.log(response)
                setNode(response.data.node)
            })
        }
        
    }
    useEffect(()=>{
        console.log(show)
        console.log('showmodal state change')
    },[show])

return (
<>
<Modal show={show} onHide={handleClose} centered>
    <Modal.Header onClick={()=>setParentComment('')}closeButton>
        <Modal.Title>Add a Comment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>{parentComment? parentComment:''}</p>
        <p>Login Status: {JSON.stringify(status)}</p>
        <p>Node Context: {JSON.stringify(node, null, 2)}</p>
        {alert}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="commentText">
                <Form.Label>Your Comment</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Comment
            </Button>
        </Form>
    </Modal.Body>
</Modal>
</>)
};
export default CommentModal