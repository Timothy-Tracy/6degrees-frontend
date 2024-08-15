import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

import CommentSubmitModal from "../../components/comments/CommentSubmitModal";
import useError from "../../hooks/useError";

function useCommentModal() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setTheError] = useState(null);
    const { APIObj } = useAPI();
    const { debug } = useDebug();

    const [show, setShow] = useState(false);
    const [parentComment, setParentComment] = useState(null)
    const [node, setNode] = useState(null)
    const[submission, setSubmission] = useState(null)
    const {handleError} = useError();
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false)

    const initCommentModal = ({node, parentComment}) => {
        if(node == null){
            handleError('NO NODE PROVIDED')
        }
        setNode(node);
        if(parentComment != null){
            setParentComment(parentComment);
        }

        handleOpen();

    }

    const CommentModalComponent = () => {
        if(node == null){
            return (<></>)
        }
        return (
    <CommentSubmitModal
        show={show}
        node={node}
        parentComment={parentComment}
        setParentComment ={setParentComment}
        handleClose={handleClose}
        setSubmission={setSubmission}

    
    ></CommentSubmitModal>)}


    useEffect(() => {
        if(submission){
            console.log('Submission Information',submission)

        }
    }, [submission])

    


    return { initCommentModal, CommentModalComponent };
}

export default useCommentModal;