import { Spinner } from "reactstrap"

export const LogoutNotification = {
    title: 'You have been logged out',
    type: 'warn'
}

export const LoginProgressNotification = {
    title: 'Logging you in',
    type: 'info',
    icon: (<Spinner></Spinner>)
}

export const LoginSuccessNotification = {
    title: 'Login Successful',
    type: 'success',
    icon: 'success', 
    duration: 5000
}

export const LoginErrorNotification = {
    title: 'Login Error',
    type: 'danger',
    icon: 'danger'
}