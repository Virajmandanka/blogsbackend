const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // Check if the Authorization header exists and is in the correct format
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send({ msg: "User Not Logged In" });
    }

    try {
        const decode = jwt.verify(token, "NodeJS03"); // Use your secret key
        console.log(decode)
        req.body.userId = decode.userid; // Attach userId to the request body (or req.user)
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(400).send({ msg: "Invalid Token" });
    }
};

module.exports = auth;
