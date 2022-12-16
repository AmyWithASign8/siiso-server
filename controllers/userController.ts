import {ApiErrors} from "../error/ApiError";
class UserController {
    async registration(req: any, res: any) {

}
    async login(req: any, res: any) {

    }
    async check(req: any, res: any, next: any) {
        const {id} = req.query
        if (!id){
            return next(ApiErrors.badRequest('Не задан ID'))
        }
        res.json(id)
    }
}
module.exports = new UserController()