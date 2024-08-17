import React, { useEffect, useState, useCallback, memo, useRef } from "react";
import { useAPI } from "../../../context/APIContext.js"
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalError } from '../../../context/ErrorContext.js';
import { Card, Button, Badge, Container } from 'reactstrap'
import { Col, Row } from "reactstrap";
import GlobalErrorComponent from "../../../../errors/GlobalErrorComponent.js";
import TimeAgo from "../../../../tools/TimeAgo.js";
import styles from './GraphVisualizer.modules.css';
import CommentModal from "../../../posts/interactions/CommentModal.js";
import ShareButton from "../../../posts/interactions/ShareButton.js";
import useNode from "../../../../hooks/useNode.js";
import useFetchNodeContextByQuery from "../../../../api/nodes/useFetchNodeContextByQuery.js";
import { useUser } from "../../../context/UserContext.js";
import GraphVisualizer from "../../../graph/GraphVisualizer.js";
import CommentProvider from "../../../comments/CommentProvider.js";


const PostPage = () => {
    const { setError: setGlobalError } = useGlobalError();
    const { APIObj } = useAPI();
    const { query } = useParams();
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const [parentComment, setParentComment] = useState(null);
    const [nodePath, setNodePath] = useState(null)
    const { node, setNode, prevNode, setPrevNode } = useNode()
    const { fetch } = useFetchNodeContextByQuery(query, setNode)
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [isLoaded, setIsLoaded] = useState(false)
    const navigate = useNavigate();
    const {user} = useUser();
    const cardRef = useRef(null);
    const [cardHeight, setCardHeight] = useState(200);
    const [cardWidth, setCardWidth] = useState(500);


    useEffect(() => {

        if (cardRef.current) {
            setCardHeight(cardRef.current.offsetHeight);
            setCardWidth(cardRef.current.offsetWidth);
            console.log(cardRef.current.offsetHeight)

        }


    }, [cardRef]);
    const fetchPostData = useCallback(async () => {
        if (isLoaded) {
            return;
        }
        try {
            console.log('fetching post data')
            const response = await APIObj.get(`/api/posts/${query}`);
            if (response.status === 200) {
                setPostData(response.data.post[0]);
                //setPrevNode(response.data.node[0]);
                setCommentData(response.data.comments);
                setIsLoaded(true)
            }
        } catch (error) {
            setGlobalError(error);
        }
    }, [APIObj]);
    const fetchDistributionPath = async () => {
        if (isLoaded) {
            return;
        }
        try {
            const response = await APIObj.get(`/api/nodes/${query}/path/`);
            console.log('fetching path')
            console.log(response)
            if (response.status === 200) {
                console.log(response.data)
                setNodePath(response.data);

            }
        } catch (error) {
            setGlobalError(error);
        }
    };
    useEffect(() => {
    if(node){
        console.log('node present')
        if(node?.EDGE_QUERY !== query){
            console.log('You have a node, and you are not visiting from your own query. Navigating...')
            navigate(`/posts/${node.EDGE_QUERY}`)
        }
    } else {
        console.log('no node present')
    }

    }, [node, query])

    useEffect(() => {
        fetch()
        fetchPostData();
        fetchDistributionPath()
    }, [fetchPostData, user]);

    return (
        <>
            {console.log(node)}
            <Container className=''>
          
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
                    <Col xs={6}>
                        <ShareButton node={node} setNode={setNode} query={query} />
                    </Col>
                </Row>
            </Card>
           
            <h4>Distribution Path</h4>
            <Row className='justify-content-center align-items-center border border-post rounded-3'>
            <GraphVisualizer data={nodePath} ></GraphVisualizer>
            </Row>
               
              
            
            <h4>Comments</h4>
            {commentData?.map((element) => (
                <CommentProvider
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
                node={node}

            />

</Container>
        </>
    );
};

export default PostPage;