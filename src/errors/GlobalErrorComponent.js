// src/components/GlobalErrorComponent.js
import React from 'react';
import { useGlobalError } from '../context/ErrorContext';
import { useState } from 'react';
import {Alert, Button} from 'react-bootstrap';

function GlobalErrorComponent() {
  const { globalError, clearError } = useGlobalError();
  const [show, setShow] = useState(true);

  if (!globalError) return null;

  
  return (
    <>
      <Alert show={show} variant="danger">
        
        <p>
        {globalError.message}
        </p>
        
       
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => {setShow(false); clearError()}} variant="outline-danger">
            Close me
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

export default GlobalErrorComponent;