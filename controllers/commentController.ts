import {ApiErrors} from "../error/ApiError";

const Comments = require('../models/models')
class CommentController {
    async create(req: any, res: any, next: any) {
        try{
            const {comment, newsId, userId} = req.body
            const comments = Comments.create({comment, newsId, userId})
            return res.json(comments)
        }catch (e){
            next(ApiErrors)
        }
    }
    async getAll(req: any, res: any) {
        const {id} = req.params
        const comments = await Comments.findAll(
            {where: {newsId: id}}
        )
    }
    async delete(req: any, res: any, next: any) {
        const {id} = req.params
        try{
            const comments = await Comments.destroy(
                {
                    where: {
                        newsId: id
                    }
                }
            )
            return res.json('Комментарий успешно удален')
        }catch (e){
            next(ApiErrors)
        }
    }
}
module.exports = new CommentController()