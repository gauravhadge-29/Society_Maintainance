class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.error = error
        this.stack = stack

        if (stack) {
            this.stack = stack
        } else {
            this.stack = Error.captureStackTrace(this, this.constructor)
        }
    }



}

export default ApiError