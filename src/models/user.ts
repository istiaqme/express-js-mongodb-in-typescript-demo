import mongoose from 'mongoose';

interface UserAttrs {
    email: string;
    password: string;
    minutes: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the User Document
interface UserDoc extends mongoose.Document {
    email: string
    minutes: number
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    minutes: {
        type: Number
    },
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };