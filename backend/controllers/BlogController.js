const BlogModel = require("../models/Blog")
const UserModel = require("../models/User")

class BlogController {

    static store = async(req,res) => {
        try {
            const {
                title,
                description,
            } = req.body

            const userId = req.user_id

            const data = new BlogModel({
                title,
                description,
                userId,
            })
            const dataSaved = await data.save()

            if (dataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Blog Submitted Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static fetchAll = async(req,res) => {
        try {
            const data = await BlogModel.find().sort({ _id: -1 }).populate('userId', 'name email')
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static fetchOne = async(req,res) => {
        try {
            const data = await BlogModel.findById(req.params.id).populate('userId', 'name email')
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static update = async(req,res) => {
        try {
            const {
                title,
                description,
            } = req.body.data

            const data = await BlogModel.findByIdAndUpdate(req.params.id, {
                title,
                description,
            })

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Blog Updated Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static delete = async(req,res) => {
        try {
            const data = await BlogModel.findByIdAndDelete(req.params.id)
            
            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Blog Deleted Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

}
module.exports = BlogController