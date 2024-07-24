import React, { useEffect, useState, useCallback, memo } from "react";
import { useAPI } from "../../context/APIContext"
import { useParams } from 'react-router-dom';
import { useGlobalError } from '../../context/ErrorContext';
import { Card, Button, Badge } from 'reactstrap'
import { Col, Row } from "reactstrap";
import GlobalErrorComponent from "../../errors/GlobalErrorComponent";
import TimeAgo from "../../tools/TimeAgo";
import { useNode } from "../../context/NodeContext.js";
import CommentModal from "./interactions/CommentModal.js";

const CommentObj = memo(function CommentObj({ COMMENT_UUID, parentComment, setParentComment, handleReply, show }) {
    const [comment, setComment] = useState(null);
    const [showChildComments, setShowChildComments] = useState(false);
    const { APIObj } = useAPI();
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchComment = useCallback(() => {
        
        if (isLoaded) return;
        
        APIObj.get(`/api/comments/${COMMENT_UUID}`)
            .then(response => {
                setComment(response.data.data);
                setIsLoaded(true);
            })
            .catch(console.error);
    }, [COMMENT_UUID, APIObj, isLoaded]);

    useEffect(() => {
        if(show){
            fetchComment();
        }
        
    }, [fetchComment, show]);

    if (!comment) return null;

    return (
        <Row style={{ display: show ? 'block' : 'none' }} className="p-3">
            <Card color='light' outline className='p-3'>
                <Row>
                    <Col>
                        <p>@{comment.username} - <TimeAgo dateString={comment.createdAt} /> </p>
                    </Col>
                </Row>
                <Row><p>{comment.body}</p></Row>
                <Row>
                    <Col className='mx-1 text-center' xs='2' sm='1'>
                        <Button className="btn" color='secondary' onClick={() => { setParentComment(comment.COMMENT_UUID); handleReply(); }}>
                            Reply
                        </Button>
                    </Col>
                    {comment.childComments?.length > 0 && (
                        <Col className='mx-1'>
                            <Button className="btn" color='secondary' onClick={() => setShowChildComments(!showChildComments)}>
                                {showChildComments ? "Hide" : "Load"} Replies <Badge color="secondary">{comment.repliesCount?.low ?? " "}</Badge>
                            </Button>
                        </Col>
                    )}
                </Row>
                {comment.childComments?.map(childCommentUUID => (
                    <CommentObj 
                        show={showChildComments}
                        key={childCommentUUID} 
                        COMMENT_UUID={childCommentUUID} 
                        handleReply={handleReply} 
                        setParentComment={(pc) => setParentComment(pc)}
                    />
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
    const [parentComment, setParentComment] = useState(null);
    const [nodePath, setNodePath] = useState(null)
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
    const fetchDistributionPath = useCallback(async () => {
        try {
            const response = await APIObj.get(`/api/nodes/path/${query}`);
            console.log('fetching path')
            console.log(response)
            if (response.status === 200) {

                setNodePath(response.data.nodes.reverse());
                
            }
        } catch (error) {
            setGlobalError(error);
        }
    }, [setNodePath]);
    useEffect(() => {
        fetchPostData();
        fetchDistributionPath()
    }, [fetchPostData, fetchDistributionPath]);

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
                    <Col xs={6}><Button className="btn" color="primary" size="lg" block onClick={handleShow}>Respond</Button></Col>
                    <Col xs={6}><Button className="btn" color="primary" size="lg" block>Share</Button></Col>
                </Row>
            </Card>
            {prevNode && (
                <Card>
                    
                        <h5>Distribution Path</h5>
                        <Row className='text-center'>
                        <p>
                            {
                                
                                nodePath?.map((node)=>{
                                    console.log('hi')
                                    return(<span>@{node.username} -- </span>)
                                })
                            }
                            <span>You</span>
                        </p>
                    </Row>
                </Card>
            )}
            <h5>Comments</h5>
            {commentData?.map((element) => (
                <CommentObj 
                    show={true}
                    key={element} 
                    COMMENT_UUID={element} 
                    setParentComment={(pc) => setParentComment(pc)} 
                    handleReply={handleShow}
                />
            ))}
            <CommentModal 
                show={showModal} 
                handleClose={handleClose} 
                parentComment={parentComment} 
                setParentComment={(pc) => setParentComment(pc)}
            />
        </>
    );
};

export default PostPage;