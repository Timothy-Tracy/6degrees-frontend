import { useEffect, useState } from "react"
import useNode  from "../../api/nodes/useNode"
import { Spinner } from "reactstrap";
import PostCard from "./PostCard";
import usePost from "../../api/posts/usePost.js";

const PostCardProvider = ({query}) => {

    const {node, myNode, POST_UUID, isLoaded, error, fetch} = useNode(query)
    const [loading, setLoading] = useState(true);
    const {post, fetchPost}= usePost();

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
    
            {loading? <Spinner></Spinner>: <PostCard post={post} node={node} mynode={myNode}></PostCard>}
        </>
    )

}

export default PostCardProvider