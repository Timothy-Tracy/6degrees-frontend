import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';
import { useUser } from '../context/UserContext';
import { useAPI } from '../context/APIContext';
import axios from 'axios';
import APIModeAlert from '../APIModeAlert';

const Login = () => {
    const { login, newStatus, updateUserData } = useUser();
    const { API, APIMode, APIObj} = useAPI();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('ROLE_CUSTOMER');
    const [createAccountMode, setCreateAccountMode] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
  

    const handleSubmit = (e) => {
        e.preventDefault();
        if(APIMode){
            tryLogin(e);
        } else {
            newStatus(true)
        }
    }  
    const tryLogin = async (e) => {
        
        const url = `${API}/api/auth/${createAccountMode ? 'register' : 'login'}`;
        const payload = createAccountMode ? {
            firstName,
            lastName,
            email,
            password,
            username,
            mobile
            
        } : { email, password };

        try {
            const response = await APIObj.post(url, payload);
            console.log(response.data)
            if (response.data.jwt) {
                login({ email, role: createAccountMode ? role : undefined }, response.data.jwt, true); // If role is not returned by signin, we should handle it differently.
                setMessage('Successful! Redirecting...');
                setMessageType('success');
                console.log('API Status:', response.status, response.statusText);
                
                
                //setTimeout(() => {navigate('/')}, 1500);
                
            } else {
                console.log('API Status:', response);
                throw new Error('No token received, authentication failed.');
            }
        } catch (error) {
            setMessage('Authentication failed: ' + (error.response?.data.message || error.message));
            setMessageType('danger');
            console.error("Authentication error:", error.response || error.message);
        }
    };

  

    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm='8'>
                    <Card>
                        <CardTitle className='p-3'><h2>{createAccountMode ? "Create Account" : "Login"}</h2></CardTitle>
                        <CardBody>
                            <APIModeAlert></APIModeAlert>
                            {message && <Alert color={messageType}>{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="email">E-mail</Label>
                                    <Input type="text" name="email" id="email" placeholder="example@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                </FormGroup>
                                {createAccountMode && (
                                    <>
                                        <FormGroup>
                                            <Label for="username">Username</Label>
                                            <Input type="text" name="username" id="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="firstName">First Name</Label>
                                            <Input type="text" name="firstName" id="firstName" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="lastName">Last Name</Label>
                                            <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="mobile">Phone Number</Label>
                                            <Input type="text" name="mobile" id="mobile" placeholder="(000)-000-0000" value={mobile} onChange={e => setMobile(e.target.value)} />
                                        </FormGroup>
                        
                                    </>
                                )}
                                <Button color="primary" type="submit">{createAccountMode ? "Sign Up" : "Login"}</Button>
                                <Button color="secondary" onClick={() => setCreateAccountMode(!createAccountMode)}>
                                    {createAccountMode ? "Back to Login" : "Create Account"}
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
