const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require ("express").Router();

// CREATE

router.post('/', verifyTokenAndAdmin, async (req,res) =>{
    const newProduct = new Product(req.body)

    try {
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
        
    } catch (error) {
        res.status(500).json(error)
        
    }

})



 // Update 

 router.put("/:id", verifyTokenAndAdmin, async (req,res) =>{
     
 try {
     const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
         $set:req.body
     },{new:true});
 res.status(200).json(updateProduct)
    
 } catch (error) {
     res.status(500).json(error)
 }
 });

//Delete

 router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
     try {
         await Product.findByIdAndDelete(req.params.id)
         res.status(200).json("Product has been deleted.")
     } catch (error) {
         res.status(500).json(error)
        
     }
 })

//Get Product

 router.get("/find/:id", async (req,res)=>{
     try {
       const product = await Product.findById(req.params.id)
       res.json(product)
       
     } catch (error) {
         res.status(500).json(error)
        
     }
 })

// //Get All Products

 router.get("/list", async (req,res)=>{
     const query = req.query.new
     try {
       let products;
       if(query){
        products = await Product.find().sort({createdAt: -1}).limit(5)
       }else{
        products = await Product.find();
       }
       res.status(200).json(products)
     } catch (error) {
         res.status(500).json(error)
        
     }
 })



module.exports = router;