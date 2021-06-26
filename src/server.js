require('dotenv').config();



import express, { Router } from 'express';
import UsersController from './app/controllers/UsersController';
import BullBoard from 'bull-board';

import Queue from './app/lib/Queue';


const app = express();
var bulls = Queue.queues.map(q => q.bull);

app.use(express.json());

app.post('/users', UsersController.store);
BullBoard.setQueues(bulls);
app.use('/admin', BullBoard.UI);
app.listen(3333, () => {
    console.log("Server running on localhost:3333");
});