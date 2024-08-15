import { useEffect, useState } from "react"
import useNode  from "../../api/nodes/useNode"
import { Spinner } from "reactstrap";
import PostCard from "./PostCard";
import usePost from "../../api/posts/usePost.js";
import useCommentModal from "../../api/comments/useCommentModal.js";

const PostCardProvider = ({query}) => {

    const {node, myNode, POST_UUID, isLoaded, error, fetch} = useNode(query)
    const [loading, setLoading] = useState(true);
    const {post, fetchPost}= usePost();
    const{initCommentModal, CommentModalComponent} = useCommentModal()

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
    
    return (
        <>
    
            {loading? 
            <Spinner></Spinner>
            : 
            <PostCard handleComment={initCommentModal} post={post} node={node} mynode={myNode}>
                <CommentModalComponent></CommentModalComponent> 
            </PostCard>}
        </>
    )

}

export default PostCardProvider