const User = require('../models/userModels')

module.exports = {
    signUp: async (req, res) => {
        const {name, email, mobile, password} = req.body;

        try{
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(409).json({msg: "Email already registered!!!"})
            }

            const user =  new User({name, email, mobile, password});
            await user.save();

            res.status(201).json({msg: "User registered successfully!!!!"})
        }catch(err){
            console.error(err.message);
            res.status(500).send('server error');
        }

    },
}