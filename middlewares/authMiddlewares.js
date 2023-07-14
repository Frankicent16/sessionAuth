// middleware to check if the user is logged in
exports.isloggedIn = (req,res,next) =>{
    if (!req.session.user) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    next()
}