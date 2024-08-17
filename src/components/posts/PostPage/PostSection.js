import { Badge, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from "reactstrap"
import TimeAgo from "../../../tools/TimeAgo"
import ShareButton from "../interactions/ShareButton"
import { FaRegCommentDots, FaRegEye } from "react-icons/fa6"
import { FiShare } from "react-icons/fi"
import UsernameAt from "../../users/UsernameAt"

const PostSection = ({ post, handleInteraction, handleComment, handleShare, children }) => {


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

                            <Button className='btn rounded-pill p-2 px-2 gap-2' color='primary' onClick={() => handleInteraction(handleShare)}>
                                <div className="d-inline-flex px-2 py-1 gap-2">
                                    <FiShare className='color-primary' size={24}></FiShare>
                                    <strong className='px-1'>Share</strong>
                                    <Badge className='px-1'>{post?.shares?.low ?? ''}</Badge>
                                </div>
                            </Button>



                            <Button className='btn rounded-pill p-2 px-2 gap-2' color='primary' onClick={() => handleInteraction(handleComment)}>

                                <div className='d-inline-flex align-items-center '>
                                    <FaRegCommentDots className='color-primary' size={24}></FaRegCommentDots>
                                    <div className='px-2 py-1 gap-2'><strong>Respond</strong></div>
                                    <Badge>{post?.comments?.low ?? ''}</Badge>

                                </div>
                            </Button>




                        </div>









                    </Row>

                </CardBody>


            </Card>

        </>
    )
}

export default PostSection