const path = require('path')
const uuid = require('uuid')
const {News, User, Like_News, Comments} = require('../models/models')
const {News_Images} = require('../models/models')
import {ApiErrors} from "../error/ApiError";
class NewsController {

    async create(req: any, res: any, next: any) {
        try{
            const {title, description} = req.body;
            const news = await News.create({title, description, userId: req.user.id})
            const {imageUrl} = req.files;
           if (imageUrl.length > 1){
               imageUrl.forEach((file: any) => {
                   let fileName = uuid.v4() + '.jpg'
                   file.mv(path.resolve(__dirname, '..', 'static', fileName))
                   News_Images.create({imageUrl: fileName, newsId: news.id})
               })
           }else{
               let fileName = uuid.v4() + '.jpg'
               imageUrl.mv(path.resolve(__dirname, '..', 'static', fileName))
               News_Images.create({imageUrl: fileName, newsId: news.id})
           }


            return res.json(news)
        }catch (e){
            console.warn(e)
            next(ApiErrors);
        }

    }
    async getAll(req: any, res: any) {
        let {userId} = req.query
        let news;
        if (!userId){
            news = await News.findAll(
            {
                include:[{
                    model: News_Images,
                }, {model: User}],
            order: [["createdAt" ,"DESC"]]}
            )
        }
        if (userId){
            news = await News.findAll({where: {userId}})
        }
        return res.json(news)
    }
    async getSelected(req: any, res: any, next: any) {
        try{
            const {id} = req.params
            const news = await News.findAll(
                { include:[{
                        model: News_Images
                    }],
                    order: [["id", "DESC"]],
                    where: {userId: id}}
            )
            if (news.length > 0 ){
                return res.json(news)
            }

        }catch (e){
            next(ApiErrors)
        }
    }
    async getOne(req: any, res: any, next: any) {
       try{
           const {id} = req.params
           const news = await News.findAll(
               {include: [{model: News_Images},{model: User},{model: Like_News},{model: Comments}],
               where: {id}}
           )

           return res.json(news)

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