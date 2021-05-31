const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');


const Todo = new mongoose.model("Todo", todoSchema);

// get all the todos

router.get ('/',async(req,res) => {
    await Todo.find({status: 'active'}, (err, data) => {
        if(err){
            res.status(500).json({
                error: 'There was a server side error'
            })
        }else {
            res.status(200).json({
                result: data,
                message: 'Todo was imported success'
            })
        }
    })
})

// get route with selectors
// router.get('/', async(req, res) => {
//     await Todo.find({status: 'active'}).select({
//         _id: 0,
//         __v: 0,
//         date: 0
//     })
//     .limit(2)
//     .exec((err, data) => {
//         if(err){
//                         res.status(500).json({
//                             error: 'There was a server side error'
//                         })
//                     }else {
//                         res.status(200).json({
//                             result: data,
//                             message: 'Todo was imported success'
//                         })
//                     }
//     })
// })
// get a todo by id

router.get('/:id',async(req,res) => {
    await Todo.findById({_id: req.params.id}, (err, data) => {
        if(err){
            res.status(500).json({
                error: 'There was a server side error'
            })
        }else {
            res.status(200).json({
                result: data,
                message: 'Todo was imported success'
            })
        }
    })
})

// post a todo

router.post('/', async(req, res) => {
    const newTodo = new Todo(req.body)
    await newTodo.save((err) => {
        if(err){
            res.status(500).json({"error": err.message})
        }else {
            res.status(200).json({
                message: 'Todo was inserted successfully!' 
            })
        }
    })
})

// post multiple todo
router.post("/all", async(req, res) => {
    await Todo.insertMany(req.body,(err) => {
        if(err){
            res.status(500).json({
                error: 'There was a server side error'
            })
        }else {
            res.status(200).json({
                message: "Todos inseted successfully"
            })
        }
    })
})
// put  todo


//  update with updateOne method

// router.put('/:id', async(req, res) => {
//    await Todo.updateOne({_id: req.params.id}, {
//        $set: {
//            status: 'inactive',
//            title: 'Changed'
//        }
//    }, (err) => {
//        if(err){
//            res.status(500).json({
//                error: 'There was an server side error'
//            })
//        }else {
//            res.status(200).json({
//                message: 'todo updated successfully'
//            })
//        }
//    })
// })

//  update with findByIdAndUpdate

router.put('/:id', async(req, res) => {
    const result = await Todo.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            title: 'Changed to findByIdAndUpdate',
            status: 'inactive'
        }
    },{
        useFindAndModify: false,
        new: true
    },(err) => {
        if(err){
            res.status(500).json({
                error: 'There was a server side error'
            })
        }else {
            res.status(200).json({
                message: 'Todo updated successfully'
            })
        }
    })
    console.log(result)
})
// delete todo

router.delete("/:id", async(req,res) => {
    await Todo.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            res.status(500).json({
                error: 'There was a server side error'
            })
        }else {
            res.status(200).json({
                
                message: 'Todo was deleted successfully'
            })
        }
    })

})

module.exports = router;