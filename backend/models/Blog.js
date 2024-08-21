const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var BlogModel = mongoose.model('blogs',blogSchema)
module.exports = BlogModel