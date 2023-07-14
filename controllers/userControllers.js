const bcryptjs = require('bcryptjs')
const userModel = require('../models/usersModels')


// signup a new user
exports.signUp = async (req,res) =>{
    try{
        const {username, email, password} = req.body

        // check if email is already registered
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json ({message: 'email already registered'})
        }

        // sort the password
        const saltedPassword = await bcryptjs.genSalt(10)
        // hash the password

        const hashedPassword = await bcryptjs.hash(password, saltedPassword)

        // create a new user 
        const user = new userModel({
            username,
            email,
            password: hashedPassword,
            // records: []
        })
        // save the user to the database
        await user.save()
        res.status(201).json({messsage: 'you have successfully signed up'
    })

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

// check if user exist
exports.signIn = async (req,res) =>{
    try{
        const { email, password } = req.body
                // check if the user exists
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(401).json({ message: 'invalid credentials'})
        }
        // compare the passwords
        const passwordMatch = await bcryptjs.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({message: 'invalid credentials'})
        }

        // set user session
        req.session.user = user
        res.status(200).json ({
            message: 'user signed in successfully',
            user 
        })


    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

// sign out the currently signed-in user
exports.signOut = (req,res) =>{
    // destroy the session
    req.session.destroy()
    res.status(500).json({
        message: 'user signed out successfully'
    })
}