import mongodb, {ObjectId} from 'mongodb'
import express from 'express'
import expressHandleBars from 'express-handlebars'
import bodyParser from "body-parser";
import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {body, validationResult} from "express-validator";
import {rtrim} from "validator";


let app = express()
let secret = 'basvc';
const PORT = process.env.PORT || 3001
let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/',
    {
        useUnifiedTopology: true,
    })

const handleBars = expressHandleBars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser(secret))
app.use(expressSession({
    secret: secret,
    resave: true,
    saveUninitialized: true,
}))
app.use(cors())

mongoClient.connect(async (error, mongo) => {

        if (!error) {
            let db = await mongo.db('socialNetwork');
            const users = await db.collection('users')
            app.post('/save-user',
                body('username').isLength({min: 4}).rtrim(' '),
                body('password').isLength({min: 5}).rtrim(' '),
                async (req, res) => {
                    let body = await req.body;
                    app.set('registeredUser', body)
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        res.status(400).send('not found');
                    }
                    await users.insertOne({name: body.username, password: body.password})
                    await res.redirect('http://localhost:3000/profile')


                })
            app.post('/enter',
                body('username').isLength({min: 3}),
                body('password').isLength({min: 4}),
                async (req, res) => {
                    let body = await req.body;
                    let user = await users.findOne({name: body.username, password: body.password})
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return res.status(400).send('not found');
                    } else {

                    }
                    if (body.username === user.name && body.password === user.password) {
                        await users.findOneAndUpdate({
                            name: body.username,
                            password: body.password
                        }, {$set: {online: true}})
                        await res.redirect("http://localhost:3000/myPage")
                    }
                })
            app.post('/update-profile',
                async (req, res) => {
                    let body = await req.body;
                    let user = await app.get('registeredUser')
                    await users.updateOne({name: user.username, password: user.password}, {
                        $set: {
                            age: body.age,
                            city: body.city,
                            country: body.country,
                            friends: [],
                            messages: [],
                            wallMessages: []
                        }
                    })
                    await res.redirect('http://localhost:3000/')
                })

            app.post('/add-friend', async (req, res) => {
                let body = await req.body;

                let user = await users.findOne({_id: ObjectId(`${body.idFriend}`)})
                if (user) {
                    let currentUser = await users.findOne({online: true})
                    await users.findOneAndUpdate({online: true}, {$set: {friends: [...currentUser.friends, user]}})
                    await res.redirect('http://localhost:3000/myPage')
                }

            })
            app.get('/current-user-friends', async (req, res) => {
                let currentUser = await users.findOne({online: true})
                res.json({
                    users: currentUser.friends
                })
            })
            app.post('/write-message', async (req, res) => {
                let body = req.body
                console.log(body)
                let online = await users.findOne({online: true})
                await users.findOneAndUpdate({online: true}, {$set: {messages: [...online.messages, body.message]}})
                await users.findOneAndUpdate({_id: ObjectId(body.id)}, {$set: {messages: [...online.messages, body.message]}})
                await res.redirect('http://localhost:3000/myPage')
            })
            app.get('/exit', async (req, res) => {
                await users.findOneAndUpdate({online: true}, {$set: {online: false}})

                await res.redirect('http://localhost:3000/')
            })
            app.get('/my-friends', async (req, res) => {
                let user = await users.findOne({online: true})
                res.json({
                    friends: user.friends
                })
            })


            app.get('/wall-messages/:id', async (req, res) => {
                let id = req.params.id
                let user = await users.findOne({_id: ObjectId(id)})
                res.json({
                    text: user.wallMessages
                })
            })
            app.post('/wall-messages/:id', async (req, res) => {
                let body = req.body;
                let elem = await users.findOne({_id: ObjectId(body.id)})
                await users.findOneAndUpdate({_id: ObjectId(body.id)}, {$set: {wallMessages: [...elem.wallMessages, body.wallMessage]}})
                res.redirect('http://localhost:3000/friends')
            })
            app.use((req, res) => {
                res.status(404).send('Not found')
            })
        } else {
            console.error(error.code)
        }
    }
)


app.engine('hbs', handleBars.engine)
app.set('view engine', 'hbs')
app.listen(PORT)
