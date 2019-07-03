import express from 'express';
import UserRepository from './userRepository';
import EventRepository from './eventReposiory';

const server = express();
server.use(express.json());

const DEFAULT_PORT = 3000;
const port : number = process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT;

const userRepository = new UserRepository();
const eventRepository = new EventRepository();

server.post('/users', (req, res) => {
    try{
        const body = req.body;
        const {email, password, phoneNumber} = body;
        var user = userRepository.create({email, password, phoneNumber});
        res.status(201);
        res.json({
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            created: user.created
        });
    }
    catch (ex){
        res.status(400);
        res.json({
            error: `Unable to create user: ${ex.message}`
        })
    }
});

server.get('/events', (req, res) => {
    try {
        const userId = req.query.userId;
        const sinceDays = req.query.sinceDays;
        const events = eventRepository.getEvents({userId, sinceDays});
        res.status(200);
        res.json({
            events: events
        });
    }
    catch (ex) {
        res.status(400);
        res.json({
            error: ex.message
        })
    }
});

server.post('/events', (req, res) => {    
    try{
        const body = req.body;
        const {type} = body;
        const userId = 'abc'; /*Assume the user id is obtained from the JWT token in authorization token (assuming user is authorized)*/
        var event = eventRepository.create(userId, type);
        res.status(201);
        res.json(event);
    }
    catch (ex){
        res.status(400);
        res.json({
            error: `Unable to create event: ${ex.message}`
        })
    }
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});