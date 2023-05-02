import * as UserServices from "../services/userServices.js"

export async function createUser(req, res){
    try {
        const {body} = req;
        const respose = await UserServices.createUser(body)
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
}