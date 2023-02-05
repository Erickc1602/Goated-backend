const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require ("express").Router();

// Update user

router.put("/users/:id", verifyTokenAndAuthorization, async (req,res) =>{
    if(req.body.password){
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword
}
     
try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },{new:true});
res.status(200).json(updatedUser)
    
} catch (error) {
    res.status(500).json(error)
}
});

//Delete

router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted.")
    } catch (error) {
        res.status(500).json(error)
        
    }
})

//Get User

router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
      const user = await User.findById(req.params.id)
      const {password, ...others} = user._doc
      res.status(200).json({others})
    } catch (error) {
        res.status(500).json(error)
        
    }
})

//Get All Users

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    const query = req.query.new
    try {
      const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
      res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
        
    }
})



module.exports = router;