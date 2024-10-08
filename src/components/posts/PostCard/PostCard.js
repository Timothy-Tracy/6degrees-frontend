
import { Container, Row, Card, CardSubtitle, CardTitle, Col, Badge, Button, Spinner } from "reactstrap"
import { FiShare } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import TimeAgo from "../../../tools/TimeAgo"
import UsernameAt from "../../users/UsernameAt";
import GraphVisualizer from "../../graph/GraphVisualizer";
import { useEffect, useRef, useState } from "react";
import Comment from "../../comments/Comment";
import ShareButton2 from "../interactions/ShareButton2";
import useCommentModal from "../../../api/comments/useCommentModal";
import useError from "../../../hooks/useError";
import LoadingWrapper from "../../loading/LoadingWrapper";
import { useNavigate } from "react-router-dom";
import { AppError } from "../../../errors/customErrors";
import { useDebug } from "../../context/DebugContext";
import { propTypes } from "react-bootstrap/esm/Image";
import ShareButton from "../../buttons/ShareButton";
import CommentButton from "../../buttons/CommentButton";
// THIS COMPONENET RECEIVES A NODE UUID OR QUERY AND THATS IT
//LEMME START BUILDING IT BASED SOLEY OFF A NODE UUID
//THAT IS ITS ONLY DSEPENDENCY
// Then it displays a "Card"

let pData = {
    POST_UUID
        :
        "0190d1d8-0160-7ff5-b03b-6aed6e24f162",
    body
        :
        "I (35f) have a daughter Kelly (16f) with my ex husband Josh(37m). We separated when Kelly was 10. Since then Josh got married again to Lily(30s f).Kelly mostly stays with me but also have her own room at Josh's house, which is significantly bigger then mine. It is important to note Kelly is not really a picky eater and usually cooks for herself as she enjoys cooking and trying new things. However she is very particular about how she wants her hot drinks done, like hot chocolate with milk only and no water or tea without any milk or sugar as she collects different types and feels adding milk or sugar ruins it.Now unfortunately Kelly had to go through an operation and currently can't move by herself and needs help. Josh suggested to have her stay at his house as he has more room and Lily can look after Kelly while he is at work since she is a housewife (they don't have any children together). Lily also agreed it will be for the best. Both me and Kelly went with the plan as I won't be able to be with her 24/7 due to my work and lack of cover and I won't be able to afford being off work for long as I have to pay for her operation alongside with other medical bills.It was a week on Friday since Kelly was staying with Josh and Lily and I would spend time with her in the evenings, when Kelly called me and asked me to take her home. I have asked what is wrong and she told me Lily kept messing with her drinks or serving her drinks she can't have (like coffee due to her meds) and when my daughter tried to raise it with her Lily said if Kelly doesn't like it she can make her own, knowing perfectly well my daughter is currently bed bound.I took her home and have told my ex I am expecting him to cover the medical bills and some of my expenses since Lily failed to do her job and her treatment of Kelly. I have refused to give her a second chance despite Josh asking me to and was called an asshole by him and my in laws.",
    comments
        :
        { low: 16, high: 0 },
    createdAt
        :
        "2024-07-20T20:31:52.675Z",
    shares
        :
        { low: 38, high: 0 },
    title
        :
        "AITA for taking my daughter away and telling my ex I expect him to support me financially while I look after her because his partner wouldnt make her tea",
    views
        :
        { low: 1139, high: 0 },
    visibility
        :
        "public"
}
let gdata = {
    nodes: [
        {
            id: "1",
            username: "alice",
            degree: 3,
            createdAt: "2023-08-13T10:30:00Z",
            views: { low: 500, high: 0 },
            shares: { low: 50, high: 0 },
            NODE_TYPE: "origin"
        },
        {
            id: "2",
            username: "bob",
            degree: 2,
            createdAt: "2023-08-13T11:15:00Z",
            views: { low: 300, high: 0 },
            shares: { low: 30, high: 0 },
            NODE_TYPE: "RESPONSE"
        },
        {
            id: "3",
            username: "charlie",
            degree: 1,
            createdAt: "2023-08-13T12:00:00Z",
            views: { low: 200, high: 0 },
            shares: { low: 20, high: 0 },
            NODE_TYPE: "RESPONSE"
        },
        {
            id: "4",
            username: null,
            degree: 1,
            createdAt: "2023-08-13T12:30:00Z",
            views: { low: 100, high: 0 },
            shares: { low: 10, high: 0 },
            NODE_TYPE: "RESPONSE"
        },
        {
            id: "5",
            username: "dave",
            degree: 2,
            createdAt: "2023-08-13T13:00:00Z",
            views: { low: 250, high: 0 },
            shares: { low: 25, high: 0 },
            NODE_TYPE: "RESPONSE"
        }
    ],
    links: [
        {
            source: "1",
            target: "2",
            EDGE_QUERY: "interesting-topic"
        },
        {
            source: "1",
            target: "3",
            EDGE_QUERY: "fascinating-discussion"
        },
        {
            source: "1",
            target: "4",
            EDGE_QUERY: "anonymous-reply"
        },
        {
            source: "2",
            target: "5",
            EDGE_QUERY: "follow-up-question"
        },
        {
            source: "3",
            target: "5",
            EDGE_QUERY: "shared-interest"
        }
    ]
};

let cData = {

    COMMENT_UUID: '0190dd10-be3a-7445-818c-66decd1b08e4',
    body: 'Yo grandaddy is a great post',
    createdAt: '2024-07-23T00:49:40.413Z',
    updatedAt: '2024-07-23T00:49:40.413Z',
    visibility: 'public',
    username: 'timsmith'
}

let bData = {

    COMMENT_UUID: '0190dd10-be3a-7445-818c-66decd1b08e4',
    body: 'my daddy is a great post',
    createdAt: '2024-07-23T00:49:40.413Z',
    updatedAt: '2024-07-23T00:49:40.413Z',
    visibility: 'public',
    username: 'timsmith'
}

let aData = {

    COMMENT_UUID: '0190dd10-be3a-7445-818c-66decd1b08e4',
    body: 'my great grandaddy is a great post',
    createdAt: '2024-07-23T00:49:40.413Z',
    updatedAt: '2024-07-23T00:49:40.413Z',
    visibility: 'public',
    username: 'timsmith'
}

/**
 * 
 * @param {function} handleComment A function that is called when the comment button is clicked
 * @param {function} handleShare A function that is called when the share button is clicked

* @returns 
 */
const PostCard = ({ handleGoToPost, post, nodeState, myNodeState, setMyNode, handleInteraction, handleComment, handleShare, children, ...props }) => {
    //const [gr, setGr] = useState(gdata)
    const cardRef = useRef(null);
    const [cardHeight, setCardHeight] = useState(200);
    const [hoveredCard, setHoveredCard] = useState(false);
    const [cardClass, setCardClass] = useState('rounded-5 p-3 shadow');
    const { debug } = useDebug()



    const { handleError, withErrorHandling, createSafeHandler } = useError()
    const safeHandleInteraction = createSafeHandler('handleInteraction', handleInteraction);
    const safeHandleComment = createSafeHandler('handleComment', handleComment);
    const safeHandleGoToPost = createSafeHandler('handleGoToPost', handleGoToPost);
    const safeHandleShare = createSafeHandler('handleShare', handleShare);



    useEffect(() => {

        if (cardRef.current) {
            setCardHeight(cardRef.current.offsetHeight || 100);


        }



    }, []);

    useEffect(() => {
        console.log(post)
    }, [post])
    useEffect(() => {
        if (hoveredCard) {
            setCardClass('bg-post rounded-5 p-3 shadow border-3 border-post')
        } else {
            setCardClass('rounded-5 p-3 shadow border-3 border-post')
        }

    }, [hoveredCard])
    return (
        <>
        
            {children}
            <Container className='py-2'>
                <Row>
                    <Card className={cardClass}
                        onMouseEnter={() => setHoveredCard(true)}
                        onMouseLeave={() => setHoveredCard(false)}

                    >
                        {/* <LoadingWrapper isLoading={isLoading}> */}
                        <Row onClick={() => safeHandleGoToPost()}>

                            <CardTitle>

                                <h3>{post?.title}</h3>
                            </CardTitle>
                            <CardSubtitle>
                                <p>

                                    <UsernameAt>timsmith</UsernameAt>
                                    <span>
                                        Posted 3 Weeks ago
                                    </span>

                                </p>
                            </CardSubtitle>
                            <p>
                                {post?.body}
                            </p>
                        </Row>
                        <Row>
                            <div className='d-flex gap-3'>
                                <div className=' d-inline-flex align-items-center rounded-pill px-3 py-2 outline'>
                                    <FaRegEye className='color-primary' size={24}></FaRegEye>
                                    <div className='px-2'><strong>Views</strong></div>
                                    <Badge className='bg-transparent'>{post?.views?.low}</Badge>

                                </div>

                                <ShareButton
                                    nodeState={nodeState}
                                    myNodeState={myNodeState}
                                    post={post}
                                    handleClick={() => safeHandleInteraction(safeHandleShare)}
                                />

                                <CommentButton
                                    nodeState={nodeState}
                                    myNodeState={myNodeState}
                                    post={post}
                                    handleClick={() => safeHandleInteraction(safeHandleComment)}
                                    
                                />
                            </div>
                        </Row>
                        {/* </LoadingWrapper> */}
                    </Card>
                    {/* <Comment disableChildren data={cData} parent={bData}><Comment disableChildren data={aData}></Comment></Comment> */}

                </Row>


            </Container>
        </>
    )
}

export default PostCard