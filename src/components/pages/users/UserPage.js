import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap"
import useFetchUser from "../../../api/users/useFetchUser";
import useFetchManyPosts from "../../../api/posts/useFetchManyPosts";
import PostCard from "../../posts/PostCard/PostCard";
import PostCardProvider from "../../posts/PostCard/PostCardProvider";
import useFetchNodeQueriesByUsername from "../../../api/users/useFetchNodeQueriesByUsername";

const UserPage = ({ username }) => {

    const { query } = useParams();
    const { setUsername, userData } = useFetchUser()
    const [user, setUser] = useState(null);
    const {queries, updateUsername,fetchNodeQueriesByUsername, isLoading, error} = useFetchNodeQueriesByUsername(query)

    
   // const {posts,setURLQuery, fetchPosts} = useFetchManyPosts({target: {username:query}});
    useEffect(() => {
        setUsername(query)
        fetchNodeQueriesByUsername(query)
    }, [query])
    useEffect(() => {
        console.log(userData)
        setUser(userData)

    }, [userData])
    useEffect(() => {
        console.log(JSON.stringify(user, null, 2))
        
        //fetchPosts()

    }, [user])

   

    // useEffect(()=>{
    //     console.log(posts, 'POSTS')
    // }, [posts])
 
    return (
        <Container>
            <Row className='py-2'>
                <Col md={6} lg={6}>
                    <h2>{user?.firstName} {user?.lastName} - @{query}</h2>

                </Col>
                
                <Col lg={3} className='text-end'>

                    {user?.followerCount?.low} Followers
                    <Button>
                        Follow
                    </Button>
                </Col>
                <Col lg={3} className='text-end'>

                    {user?.friendCount?.low} Friends
                    <Button>
                        Add+
                    </Button>
                </Col>

            </Row>
            <Row className='py-1'>
                <Col xs={12}>
                    {user?.bio}
                </Col>

            </Row>

           
            
            {
                queries?.map((query, index)=>(
                    <PostCardProvider
                    key={`${query.id}-${index}-${Date.now()}`}
                        query={query}
                    >

                    </PostCardProvider>
                ))
            }
            {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
            {/*<pre>{JSON.stringify(posts, null, 2)}</pre>*/}
        </Container>
    )
}

export default UserPage