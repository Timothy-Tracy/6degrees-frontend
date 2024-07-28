import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardGroup,
    Button,
    Row,
    Col,
    Input,
    Container,
    Label,
    Form
} from "reactstrap";
import { useUser } from "../context/UserContext.js";
import { useState, useEffect } from "react";
import axios from 'axios'; // NOTE FOR TIM : Import axios for making HTTP requests
import EnsureLogin from "../EnsureLogin.js";
import { useDebug } from "../context/DebugContext.js";
import APIModeAlert from "../APIModeAlert.js";
import { useAPI } from "../context/APIContext.js";
import Forms from "../../tools/Forms.js"
import UserObjSchemas from '../../schemas/UserObjSchemas.js'
import UserValidation from "../../validation/UserValidation.js";

import useError from '../../hooks/useError.js';
import { useGlobalError } from '../context/ErrorContext.js';
import withAsyncErrorHandler from '../../errors/withAsyncErrorHandler.js';
import{InputValidationError} from '../../errors/customErrors.js'

export const AccountInfoObject = (props) => {
    
        const handleOnChange = (e) => {
            if (props.onChange){
                props.onChange(e);
            } else {
                console.log("nothing")
            }
        }
        const isThereAValueProp = () =>{
            if (props.value != null){
                return props.value;
            } else return null;
        }
        if (props.editMode == true) {
            return (
                <div>
                    <Row className="py-1">
                        <Label for={props.id}><h5>{props.label}</h5></Label>
                    </Row>
                    
                    <Row className="p-1">
                    <Input
                        id={props.id}
                        name={props.name}
                        placeholder={props.content}
                        type={props.type}
                        onChange={(e) => { handleOnChange(e)}}
                    />
                    </Row>
                   
                </div>
            )

        } else {
            return (
                <div>
                    <Label for={props.id}><h5>{props.label}</h5></Label>
                    <p id={props.id}>{props.content}</p>
                </div>

            )

        }
    
    
}

const MyAccountPage = () => {
    const {APIMode} = useAPI();
    const {user} = useUser();
    const { token } = useUser();
    
    const MyAccount = () => {
        const { error, handleError, clearError, ErrorMessageComponent } = useError();
        const { globalError, setError: setGlobalError, clearError: clearGlobalError } = useGlobalError();
        const x = "<MyAccount>"
        const { debug } = useDebug()
        const {API, APIObj} = useAPI();
        debug("rendered", x)
        const [editMode, setEditMode] = useState(false)
        const [userData, setUserData] = useState({})
        const [output, setOutput] = useState(<div>hi</div>)
        const [user1, setUser1] = useState();
        
        // NOTE FOR TIM : Function to fetch user data from the API
        const fetchUserData = async () => {
            debug(`Fetching User Data`)
            try {
              const response = await APIObj.get(`/api/users/`);
              console.log(response)
              if (response.data) {
                 setUserData(response.data.data[0])
              } else {
                setUserData({})
                throw new Error('Failed to fetch user data');
              }
            } catch (error) {
                setGlobalError(error)
              console.error('Error fetching user data:', error);
            }
          }
        
        function toggleEditMode() {
            if (editMode) {
                setEditMode(false);
                debug(`editMode toggled to false`, x)
            } else {
                setEditMode(true)
                debug(`editMode toggled to true`, x)
            }
        }

        function handleEdit(e){
            e.preventDefault()
            console.log("Handling Edit");
            console.log(e)
            toggleEditMode();
        }
        function handleSubmit(event){
            event.preventDefault()
            const processedForm = Forms.process(event)
            try{
                const washedData =  UserValidation.validate(processedForm, UserObjSchemas.mutableUserData);
                console.log(washedData)
            } catch(error){
                handleError(error)
            }
            
    }

        

        const EditModeButton = () => {
            debug(`Edit mode button, editMode == ${editMode}`)
            if(editMode){
                return(
                    <>
                        <Button color="danger" onClick={() => { debug("toggleEditMode Button clicked", x); toggleEditMode(); }}>Cancel Edit Mode</Button>
                        <Button color="success" type="submit" onClick={(e) => { debug("Confirm Changes Button clicked", x) }}>Confirm Changes</Button>
                    </>)
                
            } else {
                return(
                    <>
                        <Button onClick={() => { debug("toggleEditMode Button clicked", x); toggleEditMode(); }}>Edit Mode</Button>
                    </>
                )
            }

            
        }

        const FormContext = ({children}) => {
            if (editMode){
                return(<Form onSubmit={(e) => handleSubmit(e)}>{children}</Form>)
            } else {
                return (<div>{children}</div>)
            }
        }
        useEffect(()=>{
            fetchUserData()
        }, [])
        //editMode effect. Render Info or input fields?
        
        return (
        <div>
            
            <FormContext>
            <APIModeAlert></APIModeAlert>
             <Row className="py-3">
                        <h2>My Account</h2>
                    </Row>
            <Row className="p-3">
                        <h3>Personal Details </h3>
                    </Row>
            <Container className="p-3">
                <Row className="py-2">
                    <Col>
                        <AccountInfoObject editMode={editMode}  id="firstName" name="firstName" content={userData.firstName} type="text" label="First Name"></AccountInfoObject>
                    </Col>
                    <Col>
                        <AccountInfoObject editMode={editMode} id="lastName" name="lastName" content={userData.lastName} type="text" label="Last Name"></AccountInfoObject>
                    </Col>
                </Row>
                <Row className="py-2">
                    <Col>
                        <AccountInfoObject editMode={editMode} id="email" name="email" content={userData.email} type="text" label="Email Address"></AccountInfoObject>
                    </Col>
                    <Col>
                        <AccountInfoObject editMode={editMode} id="mobile" name="mobile" content={userData.mobile} type="text" label="Mobile Number"></AccountInfoObject>
                    </Col>
                </Row>
                </Container>
                {/* <Container className="p-3">
                    <Row className="py-3">
                        <h3>Address Information</h3>
                    </Row>
                
                <Row className="py-2">
                    <Col>
                        <AccountInfoObject editMode={editMode} id="streetAddress" name="streetAddress" content={user1.streetAddress || ""} type="text" label="Street Address"></AccountInfoObject>
                    </Col>
                    <Col>
                    <AccountInfoObject editMode={editMode} id="city" name="city" content={user1.city || ""} type="text" label="City"></AccountInfoObject>
                    </Col>
                </Row>
                <Row className="py-2">
                    <Col>
                        <AccountInfoObject editMode={editMode} id="state" name="state" content={user1.state || ""} type="text" label="State"></AccountInfoObject>
                    </Col>
                    <Col>
                    <AccountInfoObject editMode={editMode} id="zipCode" name="zipCode" content={user1.zipCode || ""} type="text" label="Zip Code"></AccountInfoObject>
                    </Col>
                </Row>
                

            </Container> */}
            <ErrorMessageComponent></ErrorMessageComponent>
            <EditModeButton></EditModeButton>
            </FormContext>

        </div>);
    }
    const x = "<MyAccountPage>"
    const { status } = useUser();
    const { debug } = useDebug()
    const [output, setOutput] = useState('');
    debug('Rendered',x)

    //Ensure the user is logged in before serving page

    // useEffect(() => {
    //     setOutput(<EnsureLogin component={<MyAccount />}></EnsureLogin>)
    //     debug(`Status changed. Status is ${status} so im changing output`, x)
    // }, [status, APIMode])
    return (
    <div>
        <MyAccount></MyAccount>
       </div>)
}

export default MyAccountPage;
