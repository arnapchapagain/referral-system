import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import {router as referRouter} from './routes/refer';
import {router as usersRouter} from './routes/users';

import { sequelize, Users, Links } from './lib/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
app.use('/refer', referRouter);
app.use('/users', usersRouter);

sequelize.authenticate().then(async () => {
    console.log('Connected to database!');
    await Users.sync();
    await Links.sync();
})
.catch((err) => {
    console.error(err);
    throw err;
});;

app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
