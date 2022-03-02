import { User } from '../models/user';
import { hash, compare as PassCompare } from 'bcrypt';
import jwt from 'jsonwebtoken';


const jwtSecret = "VladimyrPutin";


async function hashMe (password: string) {
    let rounds = 10;
    return await hash(password, rounds);
}

export async function newUser(data: any) {
    let newDoc = new User({
        'email' : data.email,
        'password' : await hashMe(data.password)
    })
    await newDoc.save();
    return newDoc;
}

async function authenticate (data: any){
    let user = await User.findOne({
        email : data.email
    })
    if(!user){
        throw new Error('Mismatch')
    }

    PassCompare(data.password, user.password);

    let authToken = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 01 Hour
        data: user._id
    }, jwtSecret);

    return authToken;
}

