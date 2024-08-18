import PostSection from "./PostSection"

const PostPage = ({handleGoToPost, isLoading, post, nodeState, myNodeState, setMyNode, handleInteraction, handleComment, handleShare, children}) =>{
    

    return(
        <>
            <PostSection 
                post={post}
                nodeState={nodeState}

                myNodeState={myNodeState}
                handleInteraction={handleInteraction}
                handleComment={handleComment}
                handleShare={handleShare}
                >
            </PostSection>
        
        </>
    )
}

export default PostPage