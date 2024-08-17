import { useEffect } from "react";
import useFetchResponseData from "../../api/profile/useFetchResponseData";
import useFetchNodeQueriesByUsername from "../../api/users/useFetchNodeQueriesByUsername";
import PostCardProvider from "../posts/PostCard/PostCardProvider";
import ProfileResponses from "./ProfileResponses";


const ProfilePage = () => {
    const {queries,fetchNodeQueriesByUsername, isLoading, error} = useFetchNodeQueriesByUsername()
    useEffect(()=>{
        fetchNodeQueriesByUsername('timsmith')
    },[])
    return (
        <>
            <h1>Profile</h1>
            {
                queries?.map((query)=>(
                    <PostCardProvider
                        query={query}
                    >

                    </PostCardProvider>
                ))
            }
           
        </>
    )
}

export default ProfilePage;