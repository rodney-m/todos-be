const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title : {
        type : String,
        require: true
    }, 
    completed: {
        type: Boolean,
        require: false,
        default: false
    }   
});

todoSchema.set('toJSON', {
    virtuals: true
})

exports.Todo = mongoose.model('Todo', todoSchema);
exports.todoSchema = todoSchema;