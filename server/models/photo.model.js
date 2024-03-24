import {model, Schema} from 'mongoose';


const getDate= ()=> {
    const today = new Date();
    return today
}

const PhotoSchema = new Schema({

    
    takenon: {
        type: Date,
        default: getDate
    },

    url: {
        type: String,
        required: [false, "URL is required"]
    },
    
    img: {
        type: Buffer,
        contentType: String
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [200, "Max length is 200 characters"]
    },

    keywords: {
        type: [
            String
        ],
        required: [false]
    },

    favorite: {
        type: Boolean,
        default: false
    },

    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    albums: {
        type: [
            Schema.Types.ObjectId
        ]
    },

}, {timestamp: true})


const Photo = model("Photo", PhotoSchema);

export default Photo;