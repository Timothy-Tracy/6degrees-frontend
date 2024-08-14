import { useCallback, useEffect, useState } from "react";
import { useAPI } from "../context/APIContext";
import Comment from "./Comment";

const CommentProvider = ({ COMMENT_UUID, parentComment, setParentComment, handleReply, show }) =>{
    const [comment, setComment] = useState(null);
    const [showChildComments, setShowChildComments] = useState(false);
    const { APIObj } = useAPI();
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchComment = useCallback(() => {

        if (isLoaded) return;

        APIObj.get(`/api/comments/${COMMENT_UUID}`)
            .then(response => {
                setComment(response.data);
                setIsLoaded(true);
            })
            .catch(console.error);
    }, [COMMENT_UUID, APIObj, isLoaded]);

    useEffect(() => {
        if (show) {
            fetchComment();
        }

    }, [fetchComment, show]);

    if (!comment) return null;
    if(comment.error) return null;
    return (
        <>
            <Comment data={comment} handleReply={handleReply} show={show} setParentComment={setParentComment} parentComment={parentComment}>

            </Comment>
            
        </>
    )
}

export default CommentProvider