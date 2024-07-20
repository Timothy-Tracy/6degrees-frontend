import joi from 'joi'
import {useError} from '../hooks/useError'
import{InputValidationError} from '../errors/customErrors'
const validate = (obj,schema) => {
    const {error, value} = schema.validate(obj,
        {
            abortEarly:false,
        }
    )
    if(error){
        console.log(error)
        throw new InputValidationError({error:error})
    }
    return value
}

export default {validate}