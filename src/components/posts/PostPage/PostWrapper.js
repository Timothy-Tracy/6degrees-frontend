import { useParams } from "react-router-dom"
import PostProvider from "../PostProvider";
import PostPage from "./PostPage";

const PostWrapper = () => {
    const {query} = useParams();

    return(
        <>
            <PostProvider query={query}>
                <PostPage></PostPage>
            </PostProvider>
        </>
    )
}

export default PostWrapper
