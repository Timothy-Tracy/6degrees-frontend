import { Badge, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from "reactstrap"
import TimeAgo from "../../../tools/TimeAgo"

import { FaRegCommentDots, FaRegEye } from "react-icons/fa6"
import { FiShare } from "react-icons/fi"
import UsernameAt from "../../users/UsernameAt"
import CommentButton from "../../buttons/CommentButton"
import ShareButton from "../../buttons/ShareButton"

const PostSection = ({ nodeState, myNodeState, post, handleInteraction, handleComment, handleShare, children }) => {


    return (
        <>


            <Card className="p-3 rounded-5 shadow border-3 border-post">
                
                    <CardTitle>
                        <h2>{post?.title || ''}</h2>
                    </CardTitle>

                    <CardSubtitle>
                        <UsernameAt>{post?.username}</UsernameAt>
                        <TimeAgo dateString={post?.createdAt} />
                        <p>{post?.POST_UUID}</p>
                    </CardSubtitle>

            
                <CardBody>
                    <Row>
                        <p>{post?.body || ''}</p>

                    </Row>
                    <Row>
                        <div className='d-flex gap-3'>
                            <div className=' d-inline-flex align-items-center rounded-pill px-3 py-2 outline'>
                                <FaRegEye className='color-primary' size={24}></FaRegEye>
                                <div className='px-2'><strong>Views</strong></div>
                                <Badge className='bg-transparent'>{post?.views?.low ?? ''}</Badge>

                            </div>

                            <ShareButton
                                    nodeState={nodeState}
                                    myNodeState={myNodeState}
                                    post={post}
                                    handleClick={() => handleInteraction(handleShare)}
                                />

                                <CommentButton
                                    nodeState={nodeState}
                                    myNodeState={myNodeState}
                                    post={post}
                                    handleClick={() => handleInteraction(handleComment)}
                                    
                                />

                        </div>
                    </Row>
                </CardBody>
            </Card>

        </>
    )
}

export default PostSection