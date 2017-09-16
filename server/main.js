import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session'; 
import RedisStore from 'connect-redis';
import redis from 'redis';
import api from './routes';
import config from './config';

const app = express();
const port = 3000;
const devPort = 4000;

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { 
    console.log('Connected to mongodb server'); 
});
const mongoUri = `${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`
mongoose.connect(`mongodb://${config.mongo.user}:${config.mongo.password}@${mongoUri}`, {
    useMongoClient: true,
})

/* redis connection */
const redisStore = RedisStore(session);
const redisClient = redis.createClient(config.redis.port, config.redis.host, {auth_pass: config.redis.password, db: 6});

/* session configuration */
app.use(session({
    store: new redisStore({ client: redisClient }),
    secret: config.redis.secret,
    resave: false,
    saveUninitialized: true,
    ttl: 60 * 60 * 24 // 4 hours 
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);


if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
}

app.listen(port, () => {
    console.log('Express is listening on port', port);
});
