import { Card, CardSubtitle, CardTitle, Col, Container, Row } from "reactstrap"
import TimeAgo from "../../tools/TimeAgo"
import { Navigate, useNavigate } from "react-router-dom"
const Response = ({ data, key }) => {
    const navigate = useNavigate();
    return (
        <Container key={key} onClick={() => navigate(`/posts/${data.node?.EDGE_QUERY}`)}>
            <Card >
                <Row>
                    <CardTitle><h3>{data.post?.title}</h3></CardTitle>
                    <CardSubtitle>
                        <p>
                            <span>
                                @{(data.node?.username)} - {' '}
                            </span>
                            <span>
                                Posted <TimeAgo dateString={data.post?.createdAt}></TimeAgo>
                            </span>
                        </p>
                    </CardSubtitle>
                    <p>
                        {data.post?.body.toString().slice(0, 240)}...
                    </p>
                </Row>
            </Card>
        </Container>
    )
}
export default Response