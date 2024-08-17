import { useEffect, useState } from "react"
import useNode  from "../../../hooks/nodes/useNode.js"
import { Row, Spinner } from "reactstrap";
import PostCard from "./PostCard.js";
import usePost from "../../../api/posts/usePost.js";
import useCommentModal from "../../../api/comments/useCommentModal.js";
import useShare from "../../../hooks/share/useShare.js";
import { useNavigate } from "react-router-dom";

const PostCardProvider = ({query}) => {

    const {node, myNode, setMyNode, POST_UUID, isLoaded, error, fetch} = useNode(query)
    const [loading, setLoading] = useState(true);
    
    const {post, fetchPost}= usePost()
    const{initCommentModal, CommentModalComponent} = useCommentModal(myNode)
    const {initShareModal, ShareModalComponent, handleInteraction}= useShare(myNode, setMyNode)
    const navigate = useNavigate();
    useEffect(()=>{
        if(post ==null){
            fetchPost(query)
        }
        //
    }, [])

    useEffect(()=>{
        if(post!=null){
            setLoading(false)
        }
    })

    const handleGoToPost = ()=>{
        navigate(`/posts/${query}`)
    }
    
    return (
        <>
    
            <PostCard 
            // handleGoToPost={handleGoToPost}
                isLoading={loading} 
                handleInteraction={handleInteraction} 
                handleShare={initShareModal} 
                handleComment={initCommentModal}  
                post={post} 
                node={node} 
                myNode={myNode}>
                <CommentModalComponent></CommentModalComponent>
                <ShareModalComponent></ShareModalComponent> 
            </PostCard>
        </>
    )

}

export default PostCardProvider