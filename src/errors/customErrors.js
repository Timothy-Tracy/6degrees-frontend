export class AppError extends Error {
    constructor(obj) {
      super(obj.message);
      this.name = obj.name || "AppError"
      this.statusCode = obj.statusCode || null;
      this.error = obj.error || null;
      Error.captureStackTrace(this, this.constructor);
    }
  }

export class ServerError extends AppError{
    constructor(obj){
        super(obj)
    }
}

export class InputValidationError extends AppError{
    constructor(obj){
    
        super({name:'InputValidationError', message:obj.error.message, error: obj.error})
    }
}