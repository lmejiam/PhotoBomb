import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import router from './routes/user.routes.js';
import router_photos from './routes/photo.routes.js';
import router_album from './routes/album.routes.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'

const app = express();

app.use(cookieParser());
app.use(express.json(), cors({credentials: true,origin: 'http://localhost:5173' }));


const parser = bodyParser.json({limit: '50mb', extended: true})
const encoded = bodyParser.urlencoded({extended: true, limit: '50mb'})

app.use(parser)
app.use(encoded)
app.use(bodyParser.text({limit: '200mb'}))

dotenv.config();

//origin: 'http://localhost:5173'

app.use("/api", router, router_photos, router_album)

const PORT = process.env.PORT;
dbConnect();
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

