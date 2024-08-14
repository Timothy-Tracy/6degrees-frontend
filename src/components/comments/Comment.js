import React, { memo, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "reactstrap";
import TimeAgo from "../../tools/TimeAgo";
import CommentProvider from './CommentProvider.js'
import UsernameAt from "../users/UsernameAt.js";

const Comment = memo(({
  data,
  parent,
  setParentComment,
  handleReply,
  disableReply = false,
  disableChildren = false,
  show = true, 
  children
}) => {
  const [showChildComments, setShowChildComments] = useState(false);

  if (!setParentComment) {
    disableReply = true;
    disableChildren = true;
  }

  const renderCommentContent = (commentData) => (
    <Container style={{ display: show ? 'block' : 'none' }} className="my-1">
     
     <Card className='py-2 px-2 border-start border-info'>
      <Row >
        <Col>
          <p>
            <UsernameAt>{commentData?.username || 'error'}</UsernameAt>
            {' '}
            <TimeAgo dateString={commentData?.createdAt || ''} />
            {' '}
            <span>- {commentData?.visibility || ''}</span>
          </p>
        </Col>
      </Row>
      <Row>
        <p>{commentData?.body || 'comment error'}</p>
      </Row>
      <Row>
        <Col className='mx-1 text-center' xs='2' sm='1'>
          {!disableReply && (
            <Button className="btn rounded-pill" outline color='primary' onClick={() => { setParentComment(commentData?.COMMENT_UUID); handleReply(); }}>
              Reply
            </Button>
          )}
        </Col>
        {commentData?.childComments?.length > 0 && (
          <Col className='mx-1'>
            <Button className="btn rounded-pill " outline color='info' onClick={() => setShowChildComments(!showChildComments)}>
              {showChildComments ? "Hide" : "Load"} Replies <Badge className='text-color-info'color="transparent">{commentData?.repliesCount?.low ?? " "}</Badge>
            </Button>
          </Col>
        )}
      </Row>
      </Card>
      <Row className='mx-5'>
        {children}
        {!disableChildren && commentData?.childComments?.length > 0 && (
          <>
            {commentData.childComments.map(childCommentUUID => (
              <CommentProvider
                show={showChildComments}
                key={childCommentUUID}
                COMMENT_UUID={childCommentUUID}
                handleReply={handleReply}
                setParentComment={setParentComment}
              />
            ))}
          </>
        )}
      </Row>
    </Container>
  );
 
  return (
    <>
      {parent ? (
        <Comment
          data={parent}
          parentData={undefined}
          setParentComment={setParentComment}
          handleReply={handleReply}
          disableReply={disableReply}
          disableChildren={disableChildren}
          show={show}
        >
          {renderCommentContent(data)}
        </Comment>
      ) : (
        renderCommentContent(data)
      )}
    </>
  );
});

export default Comment;