import React, { useEffect, useState, useCallback, memo } from "react";
import { useAPI } from "../../context/APIContext"
import { useNode } from "../../context/NodeContext.js";
import { useUser } from "../../context/UserContext.js";
import { useParams } from 'react-router-dom';
import { useGlobalError } from '../../context/ErrorContext';
import { Card, Button, Modal,   FormLabel, FormControl } from 'react-bootstrap'
import { CloseButton, Col, FormGroup, ModalBody, ModalHeader, Row, Form } from "reactstrap";
import GlobalErrorComponent from "../../../errors/GlobalErrorComponent";
import TimeAgo from "../../../tools/TimeAgo";


const CommentModal = ({show, handleClose, parentComment, setParentComment, node}) => {
    
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

    
    useEffect(()=>{
        console.log(show)
        console.log('showmodal state change')
    },[show])


    useEffect(()=>{
  
    }, [])
return (
<>
<Modal show={show} onHide={handleClose} centered>
    
        <ModalHeader >
        
        <h3>Add a Comment</h3>
        <CloseButton onClick={()=>{setParentComment(''); handleClose()}} className='justify-content-end' variant='white'></CloseButton>
        </ModalHeader>
  
    
        
    
    <ModalBody>
        <p>{parentComment? parentComment:''}</p>
        <p>Login Status: {JSON.stringify(status)}</p>
        <p>Node Context: {JSON.stringify(node, null, 2)}</p>
        {alert}
        <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3" controlId="commentText">
                <FormLabel>Your Comment</FormLabel>
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
export default CommentModal