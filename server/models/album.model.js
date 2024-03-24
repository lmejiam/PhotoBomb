import {model, Schema} from 'mongoose';



const AlbumSchema = new Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, ""],
        maxlength: [20, ""],
        default: "My Photos"
    },



}, {timestamp: true})

const Album = model("Album", AlbumSchema);
export default Album;