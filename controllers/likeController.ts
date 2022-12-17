const Like_News = require('../models/models')
import {ApiErrors} from "../error/ApiError";
class LikeController {
    async create(req: any, res: any, next: any) {
        try{
            const {newsId, userId} = req.body
            const like = Like_News.create({newsId, userId})
            return res.json(like)
        }catch (e){
            next(ApiErrors)
        }
    }
    async getAll(req: any, res: any, next: any) {
        try{
            const likes = await Like_News.findAll();
        }catch (e){
            next(ApiErrors)
        }
    }
    async delete(req: any, res: any, next: any) {
        try {
            const {id} = req.params
            const likes = await Like_News.destroy(
                {where: {newsId: id}}
            )
            return res.json('Лайк удален')
        }catch (e){
            next(ApiErrors)
        }
    }
}
module.exports = new LikeController()