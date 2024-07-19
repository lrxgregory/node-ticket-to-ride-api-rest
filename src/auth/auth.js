const jwt = require('jsonwebtoken'); // Import the library to handle JWT tokens
const privateKey = require('../auth/private_key'); // Import the private key to verify token signatures

// Middleware to authenticate HTTP requests
module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization; // Retrieve the authorization header from the request

    if (!authorizationHeader) { // Check if the authorization header is present
        const message = `You did not provide an authentication token. Add one in the request header.`;
        return res.status(401).json({ message }); // Respond with a 401 error if no token is provided
    }

    const token = authorizationHeader.split(' ')[1]; // Extract the token from the 'Bearer <token>' format
    
    // Verify and decode the token with the private key
    jwt.verify(token, privateKey, (error, decodedToken) => {
        if (error) { // Handle errors in token verification
            const message = `The user is not authorized to access this resource.`;
            return res.status(401).json({ message, data: error }); // Respond with a 401 error if token verification fails
        }

        const userId = decodedToken.userId; // Extract the user ID from the decoded token
        
        // Check if the user ID in the request body matches the one in the token
        if (req.body.userId && req.body.userId !== userId) {
            const message = `The user ID is invalid.`;
            res.status(401).json({ message }); // Respond with a 401 error if the IDs do not match
        } else {
            next(); // Pass to the next middleware or route handler
        }
    });
};
