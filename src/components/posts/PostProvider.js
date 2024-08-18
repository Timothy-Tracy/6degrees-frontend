import React, { Children, useEffect, useState } from "react"

import { Row, Spinner } from "reactstrap";



import { useNavigate } from "react-router-dom";
import useNode from "../../hooks/nodes/useNode.js";
import usePost from "../../api/posts/usePost.js";
import useCommentModal from "../../api/comments/useCommentModal.js";
import useShare from "../../hooks/share/useShare.js";

const PostProvider = ({query, children}) => {

    const {nodeState, myNodeState, setMyNode, POST_UUIDState, isLoaded, error, fetch, refetch} = useNode(query)
    const [loading, setLoading] = useState(true);
    
    const {post, fetchPost}= usePost()
    const{initCommentModal, CommentModalComponent} = useCommentModal(myNodeState)
    const {initShareModal, ShareModalComponent, handleInteraction}= useShare(myNodeState, setMyNode)
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
    }, [])

    const handleGoToPost = ()=>{
        navigate(`/posts/${query}`)
    }

    const childProps = {
        handleGoToPost: handleGoToPost,
        isLoading: loading,
        handleInteraction: handleInteraction,
        handleShare: initShareModal,
        handleComment: initCommentModal,
        post:post,
        nodeState: nodeState,
        myNodeState:myNodeState
      };

      useEffect(()=>{
        console.log('rerendering PostProvider')
     
      },[])
    
    return (
        <>
          {React.Children.map(children, child => 
            React.cloneElement(child, childProps)
          )}
          <CommentModalComponent />
          <ShareModalComponent />
        </>
      );

}

export default PostProvider