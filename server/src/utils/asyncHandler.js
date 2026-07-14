const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            const statusCode = error.statusCode || 500;
            
            // Log the error to the backend console for debugging
            console.error("❌ [Backend Error]:", error);

            res.status(statusCode).json({
                statusCode,
                success: false,
                message: error.message || "Internal Server Error",
                errors: error.error || [],
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined
            });
        }
    }
}

export default asyncHandler
