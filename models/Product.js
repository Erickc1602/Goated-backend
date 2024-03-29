const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
{
   title:{
        type:String,
        required: true,
        unique: true
    },
    desc:{
        type:String,
        required: true
    },
    img: {
        type:String,
        required: true
    },
    size:{
        type:Array
    },
    price:{
        type: Number,
        defalut: false
    },
    inStock: {
        type:Boolean, default: true
    }
},
{timestamps: true}

);

module.exports = mongoose.model("Product", ProductSchema);