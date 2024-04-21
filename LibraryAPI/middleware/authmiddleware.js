const jwt = require('jsonwebtoken')

const verfiyToken = (req,res,next) => {
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).send('Access denied')
    }

    try{
        const decodedToken = jwt.verify(token, 'secret-key')
        req.userId = decodedToken.userId
        next()
    }catch (error){
        res.status(500).json({error: "Invalid token"})
    }
}

module.exports = verfiyToken