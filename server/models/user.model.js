import {model, Schema, SchemaType} from 'mongoose';
import bcrypt from 'bcrypt'
import Album from './album.model.js';

const UserSchema = new Schema({

    first_name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, ""],
        maxlength: [20, ""]
    },

    last_name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, ""],
        maxlength: [20, ""]
    },

    email: {
        
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        /* validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        } */
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']

    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },

    profilepic: {

        type: String,
        required: [false],
        default: "https://img.icons8.com/ios-glyphs/30/user--v1.png" 

    },

    albums: {

        type:[
            Schema.Types.ObjectId,
        ],
        default: []
    },

    update: {
        type: Boolean,
        default: false
    }



}, {timestamp: true})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });


})

UserSchema.pre('findOneAndUpdate', async function (next) {
    
    const user = await User.findById( this._conditions._id)
    if(this.options.update!== false) {
        this._update.password = await bcrypt.hash(this._update.password, 10)

    }else(

        this._update = {...this._update, password: user.password}
        
        
        
    )
    next()
})

UserSchema.post('save', async function(){

    const album  = await Album.create({name: "My Photos"})
    const user = await User.findByIdAndUpdate(this._id, { $push: {albums: album}}, {update: false})
})


const User = model("User", UserSchema);
export default User;