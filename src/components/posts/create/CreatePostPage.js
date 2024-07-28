import { useState } from "react";
import { FormControl, FormLabel } from "react-bootstrap";
import { Button, Form, FormGroup, Spinner } from "reactstrap";
import { useAPI } from "../../context/APIContext";
import useError from "../../../hooks/useError";
import Notification from "../../notifications/Notification2";
import { useNotification } from "../../context/NotificationContext";

const CreatePostPage = () => {
    const [postBodyText, setPostBodyText] = useState('');
    const [postTitleText, setPostTitleText] = useState('');
    const {APIObj} = useAPI();
    const {handleError, ErrorMessageComponent} = useError();
    const {addNotification, updateNotification, removeNotification} = useNotification()
    const handleSubmit = (e) =>{
        e.preventDefault()
        let notif = addNotification({
            title: 'Uploading post',
            message: '',
            type: 'info',
            icon: (<Spinner></Spinner>)
            
        })
        APIObj.post(`/api/posts`,{
            title:postTitleText,
            body:postBodyText
        })
        .then((result)=>{
            notif = updateNotification(notif,{
                title: 'Successfully uploaded post',
                message: '',
                type: 'success',
                icon: 'success'
                
            })
                console.log('success')
                console.log(result)
        })
        .catch((error)=>{
            removeNotification(notif)
            handleError(error)
        })
    }
    const handleClick = () => {
        
    }
    return(
        <>
            
            <h1>Create Post</h1>
            <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3" controlId="postTitleText">
                <FormLabel>Post Title</FormLabel>
                <FormControl 
                    as="textarea" 
                    rows={1} 
                    value={postTitleText}
                    onChange={(e) => setPostTitleText(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup className="mb-3" controlId="postBodyText">
                <FormLabel>Post Body</FormLabel>
                <FormControl 
                    as="textarea" 
                    rows={3} 
                    value={postBodyText}
                    onChange={(e) => setPostBodyText(e.target.value)}
                    required
                />
            </FormGroup>
            <Button type='submit'>Submit</Button>
            </Form>
        </>
    )
}

export default CreatePostPage;