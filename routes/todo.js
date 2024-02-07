const { Todo }  = require("../models/Todo");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async(req, res) => {
    const todosList = await Todo.find();

    if(!todosList){
        res.status(500).json({
            status: false,
            message: "No messages found"
        })
    }

    res.status(200).json(todosList)
});

router.post("/", async (req, res) => {

  
    let todo = new Todo(req.body);
  
    todo = await todo.save();
  
    if (!todo)
      return res
        .status(400)
        .send({ message: "Todo not saved", status: false });
  
    if (todo) {
  
      res.status(201).send(todo);
    }
  
  });


  router.put("/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo)
      return res
        .status(400)
        .send({ status: false, message: "Invalid todo id" });
  
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    if (!updatedTodo)
      return res
        .status(500)
        .send({ status: false, message: "Todo could not be updated!" });
  
    res.send(updatedTodo);
  });

  router.get("/done/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo)
      return res
        .status(400)
        .send({ status: false, message: "Invalid todo id" });
  
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {completed : !todo.completed},
      { new: true }
    );
  
    if (!updatedTodo)
      return res
        .status(500)
        .send({ status: false, message: "Todo could not be updated!" });
  
    res.send(updatedTodo);
  });


  router.get(`/:id`, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
  
    if (!todo)
      res.status(500).send({
        status: false,
        message: "Failed to get todo",
      });
  
    res.send(todo);
  });


  router.delete(`/:id`, async (req, res) => {
    const todo = await Todo.deleteOne({_id : req.params.id});
  
    if (!todo)
      res.status(400).send({
        status: false,
        message: "Invalid todo Id",
      });
  
    res.send({});
  });
  

  module.exports = router;
