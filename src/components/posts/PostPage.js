import React, { useEffect, useState, useCallback, memo } from "react";
import { useAPI } from "../../context/APIContext"
import { useParams } from 'react-router-dom';
import { useGlobalError } from '../../context/ErrorContext';
import { Card, Button, Modal, Form } from 'react-bootstrap'
import { Col, Row } from "reactstrap";
import GlobalErrorComponent from "../../errors/GlobalErrorComponent";
import TimeAgo from "../../tools/TimeAgo";
import { useNode } from "../../context/NodeContext.js";
import CommentModal from "./interactions/CommentModal.js";

const CommentObj = memo(function CommentObj({ COMMENT_UUID }) {
    const [comment, setComment] = useState(null);
    const [showChildComments, setShowChildComments] = useState(false);
    const { APIObj } = useAPI();

    useEffect(() => {
        let isMounted = true;
        APIObj.get(`/api/comments/${COMMENT_UUID}`)
            .then(response => {
                if (isMounted) setComment(response.data.data);
            })
            .catch(console.error);
        return () => { isMounted = false; };
    }, [COMMENT_UUID, APIObj]);

    if (!comment) return null;

    return (
        <Row className="p-3">
            <Card className='p-3'>
                <Row>
                    <Col>
                        <p>@{comment.username} <TimeAgo dateString={comment.createdAt} /> {comment.COMMENT_UUID} Replies: {comment.repliesCount?.low ?? " "}</p>
                    </Col>
                </Row>
                <Row><p>{comment.body}</p></Row>
                {comment.childComments?.length > 0 && (
                    <Row>
                        <Col>
                            <Button onClick={() => setShowChildComments(!showChildComments)}>
                                {showChildComments ? "Hide" : "Load"} Replies
                            </Button>
                        </Col>
                    </Row>
                )}
                {showChildComments && comment.childComments?.map(childCommentUUID => (
                    <CommentObj key={childCommentUUID} COMMENT_UUID={childCommentUUID} />
                ))}
            </Card>
        </Row>
    );
});

const PostPage = () => {
    const { setError: setGlobalError } = useGlobalError();
    const { APIObj } = useAPI();
    const { query } = useParams();
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const { prevNode, setPrevNode } = useNode();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const fetchPostData = useCallback(async () => {
        try {
            const response = await APIObj.get(`/api/posts/${query}`);
            if (response.status === 200) {
                setPostData(response.data.post[0]);
                setPrevNode(response.data.node[0]);
                setCommentData(response.data.comments);
            }
        } catch (error) {
            setGlobalError(error);
        }
    }, [APIObj, query, setGlobalError, setPrevNode]);

    useEffect(() => {
        fetchPostData();
    }, [fetchPostData]);
    

    
    return (
        <>
            <GlobalErrorComponent />
            <Card className="p-3">
                <Row>
                    <h1>{postData.title || ''}</h1>
                    <TimeAgo dateString={postData.createdAt} />
                    <p>{postData.POST_UUID}</p>
                </Row>
                <Row><p>{postData.body || ''}</p></Row>
                <Row>
                    <span>Views: {postData.views?.low ?? ''} Shares: {postData.shares?.low ?? ''} Comments: {postData.comments?.low ?? ''}</span>
                </Row>
                <Row>
                    <Col xs={6}><Button onClick={handleShow}>Respond</Button></Col>
                    <Col xs={6}><Button>Share</Button></Col>
                </Row>
            </Card>
            {prevNode && (
                <Card>
                    <Row>
                        <p>You are coming here from node {prevNode.NODE_UUID || ''}</p>
                        <p>{prevNode.user.firstName} {prevNode.user.lastName}, @{prevNode.user.username || ''} shared it with you</p>
                    </Row>
                </Card>
            )}
            {commentData?.map((element, index) => (
                <CommentObj key={element} COMMENT_UUID={element} />
            ))}
            <CommentModal show={showModal} handleClose={handleClose}></CommentModal>
            </>
    );
};

export default PostPage;