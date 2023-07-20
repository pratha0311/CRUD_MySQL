const {check, validationResult} = require("express-validator")

exports.addstudent =[
    check('emailid').trim().notEmpty().withMessage("Email is required")
                    .isEmail().withMessage("Enter correct email id"),
    
    check('password').notEmpty().withMessage("Password is required")
                    .isStrongPassword().withMessage("Enter a Strong password"),
    (req,res,next) => {
        const err = validationResult(req)
        if(!err.isEmpty()){
            return res.status(400).json({errors: err.array()})
        }
        else next();
    }
]