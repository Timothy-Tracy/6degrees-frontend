import { FaRegCommentDots } from "react-icons/fa6"
import { FiShare } from "react-icons/fi"
import { Badge, Button, Spinner } from "reactstrap"
import useError from "../../hooks/useError";
import { AppError } from "../../errors/customErrors";

const CommentButton = ({nodeState, myNodeState, post, handleClick, count}) => {

    const{handleError} = useError();

    return (
        <Button className='btn rounded-pill p-2 px-2 gap-2' color='primary' onClick={() => {
            if(myNodeState?.isLoading){
                //do nothing
            } else if(myNodeState?.error){
                handleError(new AppError({name:'CommentButton Error', message: 'myNode is in an error state'}))
            } else {
                handleClick()
            }
            
        }}><div className="d-inline-flex px-2 py-1 gap-2">
                                       
                                        {
                                            myNodeState?.isLoading ?
                                                (<Spinner></Spinner>)
                                                :
                                                (
                                                    <>
                                                        <FaRegCommentDots className='color-primary' size={24}></FaRegCommentDots>
                                                        <strong className='px-1'>Comments</strong>
                                                        <Badge className='px-1'>{post?.comments?.low}</Badge>
                                                    </>
                                                )
                                        }
                                    </div>

                                </Button>
    )
}

export default CommentButton