import PostSection from "./PostSection"

const PostPage = ({handleGoToPost, isLoading, post, node, myNode, setMyNode, handleInteraction, handleComment, handleShare, children}) =>{
    

    return(
        <>
            <PostSection 
                post={post}
                handleInteraction={handleInteraction}
                handleComment={handleComment}
                handleShare={handleShare}
               
                >

            </PostSection>
        
        </>
    )
}

export default PostPage