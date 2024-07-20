import joi from 'joi'
import UserDataSchemas from './UserDataSchemas.js'
const usernameObjSchema = joi.object().keys({
    username: UserDataSchemas.usernameSchema.required()
}).strict();

const mutableUserData = joi.object().keys({
    email: UserDataSchemas.emailSchema,
    username: UserDataSchemas.usernameSchema,
    firstName: UserDataSchemas.nameSchema,
    lastName: UserDataSchemas.nameSchema,
    mobile: UserDataSchemas.phoneSchema,
    
}).or('email', 'username', 'firstName', 'lastName', 'mobile').strict()
export default {usernameObjSchema, mutableUserData}