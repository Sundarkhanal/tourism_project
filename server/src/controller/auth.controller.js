class AuthController{

    register = (req, res, next) => {
        try {
            res.json({
                
                data: req.body,
                message:"Register Now",
                status:"ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
}


module.exports = new AuthController()