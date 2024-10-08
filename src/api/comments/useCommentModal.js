import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

import CommentSubmitModal from "../../components/modals/comments/CommentSubmitModal";
import useError from "../../hooks/useError";

function useCommentModal(myNodeState) {
    const {data, isLoading, error} = myNodeState;
   
    const { APIObj } = useAPI();
    const { debug } = useDebug();

    const [show, setShow] = useState(false);
    const [parentComment, setParentComment] = useState(null)
    const [node, setNode] = useState(null)
    const[submission, setSubmission] = useState(null)
    const {handleError} = useError();
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false)

    const initCommentModal = (parentComment) => {
        if(data == null){
            handleError('NO NODE PROVIDED')
        }else {
            if(parentComment){
                setParentComment(parentComment);
            }
    
            handleOpen();
        }
      
       

    }

    const CommentModalComponent = () => {
        if(data == null){
            return (<></>)
        }
        return (
    <CommentSubmitModal
        show={show}
        node={data}
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