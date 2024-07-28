// LoginModal.js
import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useUser } from '../context/UserContext';
import { useAPI } from '../context/APIContext';
import { useLoginModal } from './LoginModalContext';


const LoginModal = () => {
    const { login, newStatus } = useUser();
    const { API, APIMode, APIObj } = useAPI();
    const { isModalOpen, closeModal } = useLoginModal();
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


    const reset = () => {
        setEmail('');
        setPassword('');
        setFirstName('')
        setLastName('');
        setMobile('');
        setMessage('');
        setMessageType('')
      };

      const handleClose = () =>{
        
        closeModal();
        reset();
         
      }
      useEffect(() => {
        if (!isModalOpen) {
          reset();
        }
      }, [isModalOpen]);
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
            if (response.data.jwt) {
                login({ email, role: createAccountMode ? role : undefined }, response.data.jwt, true);
                setMessage('Successful! Redirecting...');
                setMessageType('success');
                setTimeout(() => {
                    handleClose()
                    // Additional logic for redirection if needed
                }, 1500);
            } else {
                throw new Error('No token received, authentication failed.');
            }
        } catch (error) {
            setMessage('Authentication failed: ' + (error.response?.data.message || error.message));
            setMessageType('danger');
            console.error("Authentication error:", error.response || error.message);
        }
    };

    return (
        <Modal isOpen={isModalOpen} toggle={handleClose}>
            <ModalHeader toggle={closeModal}>{createAccountMode ? "Create Account" : "Login"}</ModalHeader>
            <ModalBody>
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
            </ModalBody>
        </Modal>
    );
};

export default LoginModal;