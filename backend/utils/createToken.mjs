import jwt from 'jsonwebtoken';



const createToken = (res, userId) => {
    // Ensure JWT_SECRET is defined in environment variables
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not defined.");
    }

    // Create the JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expiration of 30 days
    });

    // Log token only in development mode (this should not be done in production)
    if (process.env.NODE_ENV === 'development') {
        console.log("Generated Token:", token);
    }

    // Set the token as a cookie in the response
    res.cookie('jwt', token, {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration (30 days)
    });

    // Return the token in case it's needed elsewhere in your code
    return token;
};


export default createToken;
