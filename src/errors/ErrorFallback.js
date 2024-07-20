import React from 'react';
import { useState } from 'react';
import {Alert, Button} from 'react-bootstrap';


function ErrorFallback({ error, resetErrorBoundary }) {
    const [show, setShow] = useState(true);
  
  return (
    <>
      <Alert show={show} variant="danger">
      <Alert.Heading>{`Error Fallback: ${error.name}` || 'Error Fallback: An error occurred'}</Alert.Heading>
        
        <p>
        {error.message}
        </p>
        <p>
        {error.response.data || null}
        </p>
        <p>
        {JSON.stringify(error)}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => {setShow(false); resetErrorBoundary()}} variant="outline-danger">
            Close me
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

export default ErrorFallback;