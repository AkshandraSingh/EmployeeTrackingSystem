const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        let token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "Authentication Error!"
                });
            } else {
                req.user = decoded.userData;
                next();
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message: "Token Not Found"
        })
    }
}


module.exports = {
    authentication
}
