import {ApiErrors} from "../error/ApiError";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, News} = require('../models/models')

const generateJwt = (id: number, nickname: string, email: string, role: string) => {
    return jwt.sign(
        {id, nickname, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController {
    async registration(req: any, res: any, next: any) {
        const {nickname, email, password, role} = req.body
        if (!email || !password || !nickname){
            return next(ApiErrors.badRequest('Неккоректное имя пользователя, email или пароль'))
        }
            const candidate = await User.findOne({where: {email, nickname}})
            if (candidate) {
                return next(ApiErrors.badRequest('Пользователь с таким email или именем уже существует'))
            }
            const hashPassword = await  bcrypt.hash(password, 5)
            const user = await User.create({nickname, email, role, password: hashPassword})

            const token = generateJwt(user.id, user.nickname, user.email, user.role)
            return res.json({token})

}
    async login(req: any, res: any, next: any) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiErrors.internal('Такого пользователя не существует'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiErrors.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.nickname, user.email, user.role)
        return res.json({token})
    }
    async check(req: any, res: any, next: any) {
        const token = generateJwt(req.user.id, req.user.nickname, req.user.email, req.user.role)
        return res.json({token})
    }
    async getOne(req: any, res: any, next: any){
        try {
            const {id} = req.params
            const user = await User.findOne({
                where: {id}
            })
            return res.json(user)
        }catch (e){
            next(ApiErrors)
        }
    }
    async updateUser(req: any, res: any, next: any){
        try {
            const {id} = req.params
            const {nickname} = req.body
            const user = await User.update(
                {nickname},
                {where: {id}}
            )
            return res.json(user)
        }catch (e){
            console.log(e)
        }
    }
}
module.exports = new UserController()