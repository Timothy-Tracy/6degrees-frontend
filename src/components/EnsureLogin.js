import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert } from 'reactstrap';
//Importing Contexts 
import { useUser } from "../context/UserContext";
import { useDebug } from "../context/DebugContext";
import APIModeAlert from "./APIModeAlert";

// Description & Documentation
/*
    This code is used as a tool for conditional redering.
    Use Case: Someone wants to access somethign related to a logged in user,
    but no one is logged in.

    If a component utilizes EnsureLogin, this code will make sure the user is logged in
    before the component renders

    If the user is logged in,
    The desired component renders

    If they are not logged in, 
    An alert is rendered that says "Please login to view this page"
    
    Example:
    const ShoppingCartPage = () => {
    const ShoppingCart = () => {
        return something
    };
    const { status } = useUser();
    const { debug } = useDebug();
    const [output, setOutput] = useState('');
    useEffect(() => {
        setOutput(<EnsureLogin component={<ShoppingCart></ShoppingCart>}></EnsureLogin>)
        debug(`Status changed. Status is ${status} so im changing output`)
    }, [status])
    return (output)
}
    The <EnsureLogin> object has one prop, component. Set this equal to the desired component.
    Example Explained:
    - There is a parent component required. 
    - Inside this parent component, there is a child component, which will render
    the desired content.
    - In the parent component, there is a state object that will hold "output"
    in the form of a react component
    - There is a "status" state object that holds the context of the current login state
    of the user
    -There is a useEffect which re-renders the page anytime a change is detected in login status
    -If the status is true, it sets the "output" state object of the parent
    component to the desired content(child component)
    -If not, a Login Alert is rendered instead

*/
const loginEnsured = () => {

}
export const LoginAlert = () => {
    return (
        <div>
            <Alert color="danger">
                Please {' '}
                <Link to="/login"> login </Link>
                to view this page.
            </Alert>
        </div>
    );
}
const EnsureLogin = (props) => {
    //THIS IS DEPRECATED 
    const x = "<EnsureLogin2>"
    const { status } = useUser();
    const { debug } = useDebug();



    
    debug('Currently Ensuring Login', x)

    useEffect(() => {
        
    }, [status])

    if (status) {
        debug("Login Ensured", x)
        return props.component;
    } else {
        return (<LoginAlert></LoginAlert>)
    }
}

export default EnsureLogin;