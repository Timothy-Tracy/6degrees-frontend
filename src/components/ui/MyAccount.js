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
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import axios from 'axios'; // NOTE FOR TIM : Import axios for making HTTP requests
import EnsureLogin from "../../components/EnsureLogin";
import { useDebug } from "../../context/DebugContext";
import APIModeAlert from "../APIModeAlert";
import { useAPI } from "../../context/APIContext";

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
            try {
              const response = await APIObj.get(`${API}/api/users/`);
              if (response.data) {
                 setUserData(response.data)
              } else {
                throw new Error('Failed to fetch user data');
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              return null; 
            }
          };
          fetchUserData();

/*
        // NOTE FOR TIM : FILL IN MY ACCOUNT FORM WITH API
        /// APIMode effect setting user1
        useEffect(() => {
            ///const updateUserData = async () => {
                if (APIMode) {
                    // const userData = await fetchUserData();
                    console.log(userData); 

                    if (userData) {
                        // Check if the addresses array is present and not empty
                        
                            // Handle the case where no addresses are available
                            setUser1({
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                                email: userData.email,
                                mobile: userData.mobile,
                                streetAddress: "No address provided",
                                city: "",
                                state: "",
                                zipCode: ""
                            });
                        
                    }
                } else {
                    // Handle the case where APIMode is false (maybe for testing or development)
                    setUser1({ 
                        firstName: "Timothy", 
                        lastName: "Tracy", 
                        email: "timothydtracy@gmail.com", 
                        mobile: "8185548291", 
                        streetAddress: "1234 Street Address Blvd", 
                        city: "City", 
                        state: "State", 
                        zipCode: "12345"
                    });
                }
            ///};
            
            
            ///updateUserData();
        }, [APIMode, debug]);
*/

        
        
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
            toggleEditMode();
        }

        

        //editMode effect. Render Info or input fields?
        useEffect(() => {
            debug(`editMode is ${editMode}`, x)
            const TempOutput = () => {
                if (user1 != null){
                    return (
                        <div>
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
                                        <AccountInfoObject editMode={editMode}  id="firstName" name="firsName" content={userData.firstName} type="text" label="First Name"></AccountInfoObject>
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
                                <Container className="p-3">
                                    <Row className="py-3">
                                        <h3>Address Information</h3>
                                    </Row>
                                
                                <Row className="py-2">
                                    <Col>
                                        <AccountInfoObject editMode={editMode} id="streetAddress" name="streetAddress" content={user1.streetAddress} type="text" label="Street Address"></AccountInfoObject>
                                    </Col>
                                    <Col>
                                    <AccountInfoObject editMode={editMode} id="city" name="city" content={user1.city} type="text" label="City"></AccountInfoObject>
                                    </Col>
                                </Row>
                                <Row className="py-2">
                                    <Col>
                                        <AccountInfoObject editMode={editMode} id="state" name="state" content={user1.state} type="text" label="State"></AccountInfoObject>
                                    </Col>
                                    <Col>
                                    <AccountInfoObject editMode={editMode} id="zipCode" name="zipCode" content={user1.zipCode} type="text" label="Zip Code"></AccountInfoObject>
                                    </Col>
                                </Row>
    
                            </Container>

    
                        </div>
                    )
                }
               
            }


            //if editMode then its a form, if not its not

            if(editMode){
                setOutput(
                    <div>
                        <Form onSubmit={(e) => handleEdit(e)}>
                            <TempOutput></TempOutput>
                            <Button color="danger" onClick={() => { debug("toggleEditMode Button clicked", x); toggleEditMode(); }}>Cancel Edit Mode</Button>

                            <Button color="success" type="submit" onClick={() => { debug("Confirm Changes Button clicked", x); toggleEditMode(); }}>Confirm Changes</Button>

                        </Form>
                        

                    </div>
    
                );
            } else {
                setOutput(
                    <div>
                        <TempOutput></TempOutput>
                        <Button onClick={() => { debug("toggleEditMode Button clicked", x); toggleEditMode(); }}>Edit Mode</Button>
                    </div>
    
                );
            }

            
        }, [editMode, APIMode])

        return (output);
    }
    const x = "<MyAccountPage>"
    const { status } = useUser();
    const { debug } = useDebug()
    const [output, setOutput] = useState('');

    //Ensure the user is logged in before serving page

    // useEffect(() => {
    //     setOutput(<EnsureLogin component={<MyAccount />}></EnsureLogin>)
    //     debug(`Status changed. Status is ${status} so im changing output`, x)
    // }, [status, APIMode])
    return (<MyAccount />)
}

export default MyAccountPage;
