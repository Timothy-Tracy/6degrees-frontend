import { useEffect, useState } from "react";
import { useAPI } from "../../context/APIContext"
import { useParams } from 'react-router-dom';
import useError from '../../hooks/useError';
import { useGlobalError } from '../../context/ErrorContext';
import withAsyncErrorHandler from '../../errors/withAsyncErrorHandler';
import {Card} from 'react-bootstrap'
import { Col, Row } from "reactstrap";
import GlobalErrorComponent from "../../errors/GlobalErrorComponent";
import TimeAgo from "../../tools/TimeAgo";

const PostPage = (props) => {
    const { error, handleError, clearError, ErrorMessageComponent } = useError();
        const { globalError, setError: setGlobalError, clearError: clearGlobalError } = useGlobalError();
    const {APIObj} = useAPI();
    const { query } = useParams();
    const [postData, setPostData] = useState(new Object);
    const [commentData, setCommentData] = useState([]);
    async function fetchPostData(){
        try{
            const response = await APIObj.get(`/api/posts/${query}`);
            console.log(response)
        if(response.status == 200){
            setPostData(response.data.post[0])
            setCommentData(response.data.comments)
        }
        } catch(error){
            setGlobalError(error)
        }
        
        
        
        
    }
    function displayIntVal(input){
        if(!input){
            return ''
        } else {
            return toString(input)
        }
    }

   
    
    useEffect(()=>{
        fetchPostData()
    }, [])
    return(
        <>
        <GlobalErrorComponent></GlobalErrorComponent>
        <Card className="p-3">
            <Row>
                <h1>{postData.title || ''}</h1>
                <TimeAgo dateString={postData.createdAt}></TimeAgo>
            </Row>
            <Row>
                <p>{postData.body|| ''}</p>
            </Row>
            <Row>
                <span>Views: {postData.views?.low?? '' } Shares: {postData.shares?.low?? ''} Comments: {postData.comments?.low?? ''} </span>
                
            </Row>
            
        
        </Card>
        {commentData.map((comment, index)=>(
                <Card className='p-3'>
                    <Row>
                        <Col>
                        <p>@{comment.username} <TimeAgo dateString={comment.createdAt}></TimeAgo>
                        </p>
                        </Col>
                        <Col>
                            

                        </Col>
                        
                    </Row>
                    <Row>
                    <p>{comment.body}</p>
                    
                    </Row>
                </Card>)
            )}
        
            
        </>
    )
}

export default PostPage