const Comments = require('../models/models')
const Like_News = require('../models/models')
const path = require('path')
const uuid = require('uuid')
const {News} = require('../models/models')
const {News_Images} = require('../models/models')
import {ApiErrors} from "../error/ApiError";
class NewsController {

    async create(req: any, res: any, next: any) {
        try{
            const {title, description} = req.body;
            const news = await News.create({title, description})
            const {imageUrl} = req.files;
            imageUrl.forEach((file: any) => {
                let fileName = uuid.v4() + '.jpg'
                file.mv(path.resolve(__dirname, '..', 'static', fileName))

                News_Images.create({imageUrl: fileName, newsId: news.id})
            })


            return res.json(news)
        }catch (e){
            console.warn(e)
            next(ApiErrors);
        }

    }
    async getAll(req: any, res: any) {
        let {userId, limit, page} = req.query
        page = page | 1;
        limit = limit | 9;
        let offset = page * limit - limit;
        let news;
        if (!userId){
            news = await News.findAndCountAll({limit, offset})
        }
        if (userId){
            news = await News.findAndCountAll({where: {userId}, limit, offset})
        }
        return res.json(news)
    }
    async getOne(req: any, res: any, next: any) {
       try{
           const {id} = req.params
           const news = await News.findOne(
               {where: {id}}
           )
           const images = await News_Images.findAll(
                   {where: {newsId: id}}
               )
           const comments = await Comments.findAll(
               {where: {newsId: id}}
           )
           const likes = await Like_News.findAll(
               {where: {newsId: id}}
           )

           return res.json(images)

       }catch (e){
           console.log(e)
           next(ApiErrors)
       }
    }
    async delete(req: any, res: any, next: any) {
        try{
            const {id} = req.params
            const images = await News_Images.destroy(
                {where: {newsId: id}}
            )
            const news = await News.destroy(
                {where: {id}}
            )
            const comments = await Comments.destroy(
                {where: {newsId: id}}
            )
            const likes = await Like_News.destroy(
                {where: {newsId: id}}
            )

            return res.json('Новость, комментарий и лайк связанные с ней успешно удалены')
        }catch (e){
            next(ApiErrors)
        }
    }
}

module.exports = new NewsController()