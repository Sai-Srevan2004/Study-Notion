const jwt=require('jsonwebtoken')
require('dotenv').config()

//auth

const auth=async(req,res)=>
{
    try {
        //extract token
        const token=req.cookie.token || req.body.token || req.header("Authorization").split(" ")[1]


        //if token missing return

        if(!token)
        {
            return res.json({
                success:false,
                message:"Token is missing!"
            })
        }

        //verify token

        try {
             const decode=jwt.verify(token,process.env.JWT_SECRET)
             req.user=decode
           
             console.log("token decoded",decode)


        } catch (error) {
            return res.json({
                success:false,
                message:"Invalid token!"
               })
        }
        next()
        
    } catch (error) {
       return res.json({
        success:false,
        message:"Something wrong with validation of token!"
       })
    }
}


//is student

const isStudent=async (req,res)=>{

try {
    const role=req.user.role

    if(role!=="student")
    {
        return res.json({
            success:false,
            message:"You are not a student!"
        })
    }

    // res.json({
    //     success:true,
    //     message:"Welcome student"
    // })
    next()

} catch (error) {
    res.json({
        success:false,
        message:"Something wrong while checking role"
        })
}    

}


//isInstructor

const isInstructor=async (req,res)=>{

    try {
        const role=req.user.role
    
        if(role!=="instructor")
        {
            return res.json({
                success:false,
                message:"You are not an instructor!"
            })
        }
    
        // res.json({
        //     success:true,
        //     message:"Welcome student"
        // })
        next()
    
    } catch (error) {
        res.json({
            success:false,
            message:"Something wrong while checking role"
            })
    }    
    
    }


//isAdmin


    const isAdmin=async (req,res)=>{

        try {
            const role=req.user.role
        
            if(role!=="admin")
            {
                return res.json({
                    success:false,
                    message:"You are not an admin!"
                })
            }
        
            // res.json({
            //     success:true,
            //     message:"Welcome student"
            // })
            next()
        
        } catch (error) {
            res.json({
                success:false,
                message:"Something wrong while checking role"
                })
        }    
        
        }

module.exports={isAdmin,isInstructor,isStudent,auth}