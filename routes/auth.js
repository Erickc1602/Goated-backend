const router = require ("express").Router();
const User = require("../models/User")
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

//Register
router.post('/register', async (req,res) =>{


    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
try{
    const createUser = await newUser.save();
    res.status(201).json(createUser)
}catch(err){
    res.status(500).json(err);
}

});

//Login

router.post ('/login', async (req,res)=> {
    const user = await User.findOne({username: req.body.username})

    if(user === null){
       return res.status(500).send("User does not exist")
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            
            const acessToken = jwt.sign({
                id: user._id, 
                isAdmin: user.isAdmin,
            },process.env.JWT_SEC,
            {expiresIn:"3d"}
            )
            
            const {password, ...others} = user._doc
            res.status(200).json({...others, acessToken})
        }else{
            res.send('Not Allowed')
        }
    } catch (error) {
        res.status(500).send(error)
        
    }   
})

module.exports = router;

