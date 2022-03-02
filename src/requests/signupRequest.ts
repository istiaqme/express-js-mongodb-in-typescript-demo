import express, { Request, Response, NextFunction} from 'express';
import { User } from '../models/user';

function validateEmail(email: string) {
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if(!regexEmail.test(email)){
        throw new Error("Email format is not validate");
    }
    return true;
}

async function checkEmailIsUnique(email: string) {
    let user = await User.findOne({email: email});
    if(user) {
        throw new Error("User is already registered");
    }
    return true;
}

function validatePassword(password: string) {
    /* let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])$/;
    if(!pattern.test(password)){
        throw new Error("Password must contain at least one number, one lowercase and one uppercase letter");
    } */
    return true;
}



export async function handle(req: Request, res: Response, next: NextFunction) {
    try{
        validateEmail(req.body.email);
        await checkEmailIsUnique(req.body.email);
        validatePassword(req.body.password);
        next();
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            status: 'error'
        })
    }
}

