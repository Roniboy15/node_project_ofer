exports.auth = (req,res,next) => {
    let token = req.header("x-api-key");
    if(!token){
        return res.status(401).json({msg:"Please send a valid token to this endpoint"})
    }

    try {
        let decodeToken = jwt.verify(token, config.tokenSecret);

        req.tokenData = decodeToken;

        next();
    }

    catch(err) {
        return res.status(401).json({msg:"Token is invalid or expired"});
    }
}